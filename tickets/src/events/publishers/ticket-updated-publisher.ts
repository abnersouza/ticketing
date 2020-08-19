import { Publisher, Subjects, TicketUpdatedEvent } from "@abrtickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
