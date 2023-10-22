export type Channel<T extends ChannelEvent> = T["channel"];

export type ChannelEvent<
  Channel extends string = string,
  Event extends string = string,
  Payload = object
> = {
  channel: Channel;
  event: Event;
  payload: Payload;
};
