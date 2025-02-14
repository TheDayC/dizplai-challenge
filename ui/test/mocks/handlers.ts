import { http, HttpResponse } from 'msw';

export const handlers = [
    http.get('http://localhost:3001/polls/1', () => {
        return HttpResponse.json({
            id: 1,
            name: 'Who will win the Superbowl?',
            date: '2025-02-11T20:55:40.023Z',
            options: ['Kansas City Chiefs', 'Philadelphia Eagles'],
        });
    }),
    http.post('http://localhost:3001/votes/new', () => {
        console.log('Intercepted GET request to /votes/new');
        return HttpResponse.json({
            id: 2,
            pollId: 1,
            date: '2025-02-11T20:55:40.023Z',
            username: 'ui_user',
            optionSelected: 'Kansas City Chiefs',
        });
    }),
    http.get('http://localhost:3001/polls/1/votes/', () => {
        console.log('Intercepted GET request to /polls/1/votes');
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
];
