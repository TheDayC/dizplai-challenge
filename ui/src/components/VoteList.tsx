import { Typography, Stack } from '@mui/material';
import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';

import LinearProgressWithLabel from './ProgressBar';
import { votesSchema } from '../utils/schemas';

interface VoteListProps {
    pollId: number;
    optionSelected: string;
    options: string[];
}

const VoteList: FC<VoteListProps> = ({ pollId, optionSelected, options }) => {
    const { data: results } = useQuery({
        queryKey: ['votes', pollId, options],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3001/polls/${pollId}/votes/`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }).then((r) => r.json());

            const { data: votes, success } = votesSchema.safeParse(res);

            if (success) {
                const totalVotes = votes.length;

                return options.map((option) => {
                    const optionVotes = votes.filter((vote) => vote.optionSelected === option);
                    const optionVoteCount = optionVotes.length;

                    return {
                        optionName: option,
                        value: (optionVoteCount / totalVotes) * 100,
                    };
                });
            } else {
                return undefined;
            }
        },
    });

    return (
        <Stack direction="column" alignItems="center" justifyContent="flex-start" spacing={2}>
            <Typography variant="h4" component="h1" sx={{ color: 'white' }}>
                Thank you for your response
            </Typography>
            <Typography variant="body1" sx={{ color: 'white' }}>
                You voted: {optionSelected}!
            </Typography>
            {results &&
                results.length > 0 &&
                results.map((result) => (
                    <LinearProgressWithLabel
                        value={result.value}
                        optionname={result.optionName}
                        key={`result-${result.optionName}`}
                    />
                ))}
        </Stack>
    );
};

export default VoteList;
