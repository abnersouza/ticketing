import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { Order, OrderStatus } from "../../models/order";
import { natsWrapper } from "../../nats-wrapper";

const buildTicket = async () => {
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });
  await ticket.save();

  return ticket;
};

it("returns an error if the status is invalid", async () => {
  const ticket = await buildTicket();

  const userCookie = global.signin();
  // make a request to create an order
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", userCookie)
    .send({ ticketId: ticket.id })
    .expect(201);

  //make a request with empty status
  await request(app)
    .patch(`/api/orders/${order.id}`)
    .set("Cookie", userCookie)
    .send()
    .expect(400);
  // make a request with invalid status value
  await request(app)
    .patch(`/api/orders/${order.id}`)
    .set("Cookie", userCookie)
    .send({ status: "not_valid" })
    .expect(400);
});

it("marks an order as cancelled", async () => {
  // create a ticket with Ticket Model
  const ticket = await buildTicket();

  const userCookie = global.signin();
  // make a request to create an order
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", userCookie)
    .send({ ticketId: ticket.id })
    .expect(201);

  //make a request to cancel the order
  await request(app)
    .patch(`/api/orders/${order.id}`)
    .set("Cookie", userCookie)
    .send({ status: OrderStatus.Cancelled })
    .expect(204);

  // expectation to make sure the thing is cancelled
  const updatedOrder = await Order.findById(order.id);
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it("emits a order cancelled event", async () => {
  const ticket = await buildTicket();

  const userCookie = global.signin();
  // make a request to create an order
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", userCookie)
    .send({ ticketId: ticket.id })
    .expect(201);

  expect(order).toBeDefined();
  expect(order.status).toBeDefined();
  expect(order.ticket.id).toBeDefined();
  expect(order.ticket.title).toBeDefined();

  // make a request to cancel the order
  await request(app)
    .patch(`/api/orders/${order.id}`)
    .set("Cookie", userCookie)
    .send({ status: OrderStatus.Cancelled })
    .expect(204);

  // expectation to make sure the thing is cancelled
  const updatedOrder = await Order.findById(order.id);
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
