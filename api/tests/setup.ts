import { server } from './mocks/server';

// Start MSW server before tests
beforeAll(() => server.listen());

// Reset handlers after each test (to avoid any state leakage)
afterEach(() => server.resetHandlers());

// Close server after all tests
afterAll(() => server.close());
