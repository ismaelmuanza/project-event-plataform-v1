export interface ParticipantProps {
    id: string,
    eventId: string,
    name: string,
    email: string
}
export class Participant {

  constructor(
    public id: string,
    public eventId: string,
    public name: string,
    public email: string
  ) { }
}