import { Publisher, Subjects, TicketCreatedEvent } from "@abrtickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
