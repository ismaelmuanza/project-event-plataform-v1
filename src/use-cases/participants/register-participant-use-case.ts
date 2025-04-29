import { EventRepositoryInterface } from '@/repositories/interface/event-repository-interface';
import { ParticipantRepositoryInterface } from '@/repositories/interface/participant-repository-interface';
import { SendEmailService } from '@/services/send-email-service';

interface RegisterParticipantRequest {
  id: string
  event_id: string;
  name: string;
  email: string;
}

export class RegisterParticipantUseCase {
  constructor(
    private participantRepository: ParticipantRepositoryInterface,
    private eventRepository: EventRepositoryInterface,
    private emailService: SendEmailService
  ) {}

  async execute(data: RegisterParticipantRequest) {

    const event = await this.eventRepository.findById(data.event_id);

    if (!event) {
      throw new Error('Event does not exist.');
    }

    const existingParticipant = await this.participantRepository.findParticipantByIdAndEventId({eventId: data.event_id, participantId: data.id})
    
    if(existingParticipant) {
      throw new Error('Participant already registered for this event.')
    }

    const participantData: RegisterParticipantRequest = {
      id: data.id,
      event_id: data.event_id,
      name: data.name,
      email: data.email
    };

    const particpant = await this.participantRepository.create(participantData);

    await this.emailService.sendEmail({
      to: data.email,
      subject: 'Event Registration Confirmation',
      html: `<p>Hello ${data.name},</p><p>You have successfully registered for the event. See you there!</p>`
    });

    return particpant
  }
}