import request from 'supertest';

import app from '../src';
import { server } from './mocks/server';

// Start MSW server before tests
beforeAll(() => server.listen());

// Reset handlers after each test (to avoid any state leakage)
afterEach(() => server.resetHandlers());

// Close server after all tests
afterAll(() => server.close());

describe('GET /polls/list', () => {
    it('should return a mocked list of polls', async () => {
        const response = await request(app).get('/polls/list');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            {
                id: 1,
                name: 'Who will win the Superbowl?',
                date: '2025-02-11T20:55:40.023Z',
                options: ['Kansas City Chiefs', 'Philadelphia Eagles'],
            },
        ]);
    });
});

describe('GET /polls/:id', () => {
    it('should return a poll', async () => {
        const response = await request(app).get('/polls/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: 1,
            name: 'Who will win the Superbowl?',
            date: '2025-02-11T20:55:40.023Z',
            options: ['Kansas City Chiefs', 'Philadelphia Eagles'],
        });
    });
});

describe('POST /polls/new', () => {
    it('should create a poll', async () => {
        const response = await request(app).post('/polls/new');

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            id: 3,
            name: 'Yes or No?',
            date: '2025-02-11T20:55:40.023Z',
            options: ['Yes', 'No'],
        });
    });
});

describe('GET /polls/1/votes', () => {
    it('should get poll 1 votes', async () => {
        const response = await request(app).get('/polls/1/votes');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            {
                id: 1,
                pollId: 1,
                date: '2025-02-11T20:55:40.023Z',
                username: 'ui_user',
                optionSelected: 'Kansas City Chiefs',
            },
            {
                id: 2,
                pollId: 1,
                date: '2025-02-11T20:55:40.023Z',
                username: 'ui_user',
                optionSelected: 'Philadelphia Eagles',
            },
        ]);
    });
});
