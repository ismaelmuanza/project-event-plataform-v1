import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository"
import { SendEmailService } from "@/services/send-email-service"
import { RegisterUserUseCase } from "../users/register-user-use-case"
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-repository-prisma"


export function makeRegisterUserUseCase () {

    const emailService = new SendEmailService()
    const userRepository = new InMemoryUserRepository()
    const registerUseCase = new RegisterUserUseCase(userRepository, emailService)

    return registerUseCase
}