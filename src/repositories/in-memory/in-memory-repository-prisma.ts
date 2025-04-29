import crypto from 'node:crypto';
import { UserRepositoryInterface } from '@/repositories/interface/user-repository-interface';
import { Prisma, User } from '@prisma/client';

interface RegisterUserRequest {
    id?: string;
    name: string;
    email: string;
    password: string;
}

export class InMemoryUserRepository implements UserRepositoryInterface {
  private users: User[] = [];

  async create(data: Prisma.UserCreateInput){
    const user: User = {
      id: data.id ?? crypto.randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    return user || null;
  }

  async findById(id: string) {
    const user = this.users.find((user) => user.id === id);
    return user || null;
  }

  async update(user: User): Promise<User> {
    const index = this.users.findIndex((u) => u.id === user.id);

    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...user, updated_at: new Date() };
      return this.users[index];
    }
    
    throw new Error('User not found');
  }

  async findAll() {
    const users = this.users
    return users;
  }
}