import { app } from '../app';
import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import request from 'supertest';

describe('Register Participant E2E', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should register a participant successfully', async () => {
        // Create an event first
        const eventResponse = await request(app.server)
            .post('/events')
            .send({
                id: 'event-4',
                title: 'Tech Conference',
                description: 'A conference about technology.',
                date: '2025-05-01T10:00:00.000Z',
                creater_event: 'user-2',
            });

        expect(eventResponse.status).toBe(201);
        const eventId = eventResponse.body.event.id;

        // Register a participant for the event
        const participantResponse = await request(app.server)
            .post('/participants')
            .send({
                id: 'user-1',
                event_id: eventId,
                name: 'Jane Doe',
                email: 'janedoe@example.com',
            });

        expect(participantResponse.status).toBe(201);
        expect(participantResponse.body.participant).toEqual(
            expect.objectContaining({
                id: 'user-1',
                event_id: eventId,
                name: 'Jane Doe',
                email: 'janedoe@example.com',
            })
        );
    });
});