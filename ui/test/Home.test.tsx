import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, describe, beforeEach } from 'vitest';

import Home from '../src/pages/Home';
import { QueryClientTestProvider } from './utils';

beforeEach(() => {
    render(
        <QueryClientTestProvider>
            <Home />
        </QueryClientTestProvider>
    );
});

describe('Home Page', () => {
    it('check for vote context title', async () => {
        await waitFor(() => {
            expect(screen.getByText('Who will win the Superbowl?')).toBeInTheDocument();
        });
    });

    it('check for radio buttons via role', async () => {
        await waitFor(async () => {
            const radioGroup = screen.getByRole('radiogroup');
            const input = await within(radioGroup).findAllByRole('radio');

            expect(input[0]).toBeInTheDocument();
            expect(input[1]).toBeInTheDocument();
        });
    });

    it('click the second radio button and submit', async () => {
        const user = userEvent.setup();

        // Select the second radio button and ensure it's checked.
        await waitFor(async () => {
            const radioGroup = screen.getByRole('radiogroup');
            const input = await within(radioGroup).findAllByRole('radio');

            await user.click(input[1]);

            expect(input[1]).toBeChecked();
        });
    });

    it('submit the vote and check results', async () => {
        const user = userEvent.setup();

        // Find the button and submit the vote form.
        await waitFor(async () => {
            const voteBtn = screen.getByRole('button');
            expect(voteBtn).toBeInTheDocument();

            await user.click(voteBtn);
        });

        // Wait for the page to transition and check the mocked values are showing on the page.
        await waitFor(async () => {
            const resultContainer = await screen.findAllByTestId('resultContainer');

            const resultName1 = within(resultContainer[0]).getByTestId('resultName');
            const result1 = within(resultContainer[0]).getByTestId('result');

            expect(resultName1).toHaveTextContent('Kansas City Chiefs');
            expect(result1).toHaveTextContent('50%');

            const resultName2 = within(resultContainer[1]).getByTestId('resultName');
            const result2 = within(resultContainer[1]).getByTestId('result');

            expect(resultName2).toHaveTextContent('Philadelphia Eagles');
            expect(result2).toHaveTextContent('50%');
        });
    });
});
