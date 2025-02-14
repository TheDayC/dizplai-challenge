import { http, HttpResponse } from 'msw';

export const handlers = [
    http.get('*/polls/list', () => {
        return HttpResponse.json([
            {
                id: 1,
                name: 'Who will win the Superbowl?',
                date: '2025-02-11T20:55:40.023Z',
                options: ['Kansas City Chiefs', 'Philadelphia Eagles'],
            },
        ]);
    }),
    http.get('*/polls/1', () => {
        return HttpResponse.json({
            id: 1,
            name: 'Who will win the Superbowl?',
            date: '2025-02-11T20:55:40.023Z',
            options: ['Kansas City Chiefs', 'Philadelphia Eagles'],
        });
    }),
    http.post('*/polls/new', () => {
        return HttpResponse.json(
            {
                id: 3,
                name: 'Yes or No?',
                date: '2025-02-11T20:55:40.023Z',
                options: ['Yes', 'No'],
            },
            { status: 201 }
        );
    }),
    http.get('*/polls/1/votes', () => {
        return HttpResponse.json([
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
    }),
    http.post('*/votes/new', () => {
        return HttpResponse.json(
            {
                id: 2,
                pollId: 1,
                date: '2025-02-11T20:55:40.023Z',
                username: 'ui_user',
                optionSelected: 'Kansas City Chiefs',
            },
            { status: 201 }
        );
    }),
];
