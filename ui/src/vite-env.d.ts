/// <reference types="vite/client" />

declare module '@mui/material/Radio' {
    interface RadioProps {
        inputProps?: {
            'data-testid'?: string;
        };
    }
}
