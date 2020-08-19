import { Subjects, Publisher, OrderCancelledEvent } from "@abrtickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
