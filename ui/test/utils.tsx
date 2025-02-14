import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';

const createTestQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false, // Disable retries in tests to prevent delays
            },
        },
    });

interface Props {
    children: ReactNode;
}

// Custom wrapper for rendering components inside QueryClientProvider
export const QueryClientTestProvider = ({ children }: Props) => {
    const testQueryClient = createTestQueryClient();

    return <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>;
};
