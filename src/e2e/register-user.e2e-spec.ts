import { app } from '../app';
import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import request from 'supertest';

describe('E2E: Register User', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should register a user successfully', async () => {
        const response = await request(app.server)
            .post('/users')
            .send({
                name: 'John Doe',
                email: 'johndoe123@example.com',
                password: '123456',
            });

        expect(response.status).toBe(201);
        expect(response.body.user).toEqual(
            expect.objectContaining({
                name: 'John Doe',
                email: 'johndoe123@example.com',
            })
        );
    });

    it.only('should not allow registering a user with an existing email', async () => {
        await request(app.server)
            .post('/users')
            .send({
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: '123456',
            });

        const response = await request(app.server)
            .post('/users')
            .send({
                name: 'Jane Doe',
                email: 'johndoe@example.com',
                password: '654321',
            });

        expect(response.status).toBe(409);
        expect(response.body.message).toBe('User already exists.');
    });
});