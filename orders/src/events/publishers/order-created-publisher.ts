import { Publisher, OrderCreatedEvent, Subjects } from "@abrtickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
