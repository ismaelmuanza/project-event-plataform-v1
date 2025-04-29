import { Prisma } from '@prisma/client';
import { UserRepositoryInterface } from '../interface/user-repository-interface';
import { prisma } from '@/lib/prisma';
import crypto from 'node:crypto'

export class PrismaUserRepository implements UserRepositoryInterface {

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data: {
        ...data,
        id: data.id ?? crypto.randomUUID(), 
        created_at: new Date(),
        updated_at: new Date()
      },

    });

    return user

  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    if(!user) {
        return null
    }

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user
  }

  async update(user: Partial<Prisma.UserUpdateInput> & { id: string }) {
    const { id, ...data } = user;

    const newUser = await prisma.user.update({
      where: { id },
      data,
    });

    return newUser
  }

  async findAll() {
    const users = await prisma.user.findMany();
    return users;
  }
}