import { Box, Container } from '@mui/material';
import { FC, ReactNode, useEffect } from 'react';

import hero from '../assets/hero.webp';

interface PageWrapperProps {
    title: string;
    children: ReactNode;
}

const PageWrapper: FC<PageWrapperProps> = ({ title, children }) => {
    useEffect(() => {
        document.title = `${title} | Dizplai Challenge`;
    }, []);

    return (
        <Box sx={{ py: 2, background: `#07072a url('${hero}') no-repeat center center scroll`, height: '100vh' }}>
            <Container maxWidth="xl">{children}</Container>
        </Box>
    );
};

export default PageWrapper;
