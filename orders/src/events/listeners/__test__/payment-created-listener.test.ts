import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { PaymentCreatedEvent, OrderStatus } from "@abrtickets/common";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket";
import { PaymentCreatedListener } from "../payment-created-listener";
import { Order } from "../../../models/order";

const setup = async () => {
  // Create a listener
  const listener = new PaymentCreatedListener(natsWrapper.client);

  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });
  await ticket.save();

  const order = Order.build({
    ticket,
    userId: "123456",
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });
  await order.save();

  // Create a fake data object
  const data: PaymentCreatedEvent["data"] = {
    id: mongoose.Types.ObjectId().toHexString(),
    orderId: order.id,
    stripeId: "1234",
  };

  // Create a fake msg object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { msg, data, order, listener };
};

it("returns an error if the order is not found", async () => {
  const { msg, listener } = await setup();

  const data: PaymentCreatedEvent["data"] = {
    id: mongoose.Types.ObjectId().toHexString(),
    orderId: mongoose.Types.ObjectId().toHexString(),
    stripeId: "1234",
  };

  await expect(listener.onMessage(data, msg)).rejects.toThrowError(
    "Order not found"
  );
});

it("updates the order status to completed", async () => {
  const { msg, data, order, listener } = await setup();

  await listener.onMessage(data, msg);

  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).not.toEqual(order.status);
  expect(updatedOrder!.status).toEqual(OrderStatus.Complete);
});

it("acks the message", async () => {
  const { msg, data, listener } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
