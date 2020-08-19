import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@abrtickets/common";

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  readonly subject = Subjects.ExpirationComplete;
}
