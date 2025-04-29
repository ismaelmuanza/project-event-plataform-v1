import { PrismaEventRepository } from "@/repositories/prisma/prisma-event-repository"
import { CreateEventUseCase } from "../events/create-event-use-case"
import { SchedulerService } from "@/services/scheduler-service"
import { NotificationService } from "@/services/notification-service"


export function makeCreateEventUseCase () {

    const notificationService = new NotificationService()
    const eventRepository = new PrismaEventRepository()
    const schedulerService = new SchedulerService(notificationService, eventRepository)

    const createEventUseCase = new CreateEventUseCase(eventRepository, schedulerService)

    return createEventUseCase
}