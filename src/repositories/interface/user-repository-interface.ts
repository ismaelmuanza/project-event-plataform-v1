import { Prisma, User } from '@prisma/client';

export interface UserRepositoryInterface {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  update(user: User): Promise<User>;
  findAll(): Promise<User[]>;
}