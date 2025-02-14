import {
    Typography,
    LinearProgressProps,
    LinearProgress as MUILinearProgress,
    Box,
    styled,
    linearProgressClasses,
    alpha,
} from '@mui/material';
import { FC } from 'react';

const LinearProgress = styled(MUILinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: alpha(theme.palette.common.white, 0.2),
        border: '2px solid white',
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 2,
        backgroundColor: theme.palette.primary.main,
    },
}));

interface LinearProgressWithLabel extends LinearProgressProps {
    value: number;
    optionname: string;
}

const LinearProgressWithLabel: FC<LinearProgressWithLabel> = (props) => (
    <Box sx={{ width: '100%', position: 'relative' }} data-testid="resultContainer">
        <LinearProgress {...props} variant="determinate" sx={{ height: 50 }} />
        <Typography
            variant="body2"
            sx={{ color: 'white', position: 'absolute', top: 'calc(50% - 10px)', left: 10 }}
            data-testid="resultName"
        >
            {props.optionname}
        </Typography>
        <Typography
            variant="body2"
            sx={{ color: 'white', position: 'absolute', top: 'calc(50% - 10px)', right: 10 }}
            data-testid="result"
        >
            {`${Math.round(props.value)}%`}
        </Typography>
    </Box>
);

export default LinearProgressWithLabel;
