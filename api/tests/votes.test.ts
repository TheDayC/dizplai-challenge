import request from 'supertest';

import app from '../src';
import { server } from './mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('POST /votes/new', () => {
    it('should create a new vote', async () => {
        const response = await request(app).post('/votes/new');

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            id: 2,
            pollId: 1,
            date: '2025-02-11T20:55:40.023Z',
            username: 'ui_user',
            optionSelected: 'Kansas City Chiefs',
        });
    });
});
