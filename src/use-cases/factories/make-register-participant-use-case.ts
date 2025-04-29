import { PrismaEventRepository } from "@/repositories/prisma/prisma-event-repository"
import { SendEmailService } from "@/services/send-email-service";
import { PrismaParticipantRepository } from "@/repositories/prisma/prisma-participant-repository";
import { RegisterParticipantUseCase } from "../participants/register-participant-use-case";


export function makeRegisterParticipantUseCase () {
  
    const emailService = new SendEmailService();
    const eventRepository = new PrismaEventRepository();

    const participantRepository = new PrismaParticipantRepository();
    const registerParticipantUseCase = new RegisterParticipantUseCase(participantRepository, eventRepository, emailService);

    return registerParticipantUseCase
}