import { FC, useState } from 'react';
import { Button, Container, FormControl, FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { HowToVote } from '@mui/icons-material';

import PageWrapper from '../components/PageWrapper';
import { VoteSubmission } from '../types/forms';
import { voteSchema, pollSchema } from '../utils/schemas';
import logo from '../assets/logo.svg';
import VoteList from '../components/VoteList';

const DEFAULT_POLL_ID = 1;

const HomePage: FC = () => {
    const [hasVoted, setHasVoted] = useState(false);
    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            optionSelected: '',
        },
    });

    const { data: poll } = useQuery({
        queryKey: ['pollOptions', DEFAULT_POLL_ID],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3001/polls/${DEFAULT_POLL_ID}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }).then((r) => r.json());

            const { data, success } = pollSchema.safeParse(res);

            // If a successful parse happens then populate the default value and return...
            if (success) {
                setValue('optionSelected', data.options[0]);

                return data;
            } else {
                // ... else return nothing.
                return undefined;
            }
        },
    });

    // Leverage TanStack's mutation hook to handle the await from the fetch and make a triggerable request easily.
    const pollMutation = useMutation({
        mutationFn: async (data: VoteSubmission) => {
            const res = await fetch('http://localhost:3001/votes/new', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: poll?.id,
                    username: 'ui_user',
                    optionSelected: data.optionSelected,
                }),
            }).then((r) => r.json());

            const { data: vote, success } = voteSchema.safeParse(res);

            if (success) {
                setHasVoted(true);

                return vote;
            } else {
                // ... else return nothing.
                return undefined;
            }
        },
    });

    // The form handler provides accessibility that web users are used to and provides and easy way to type and handle inputs once validated.
    const onSubmit: SubmitHandler<VoteSubmission> = (data) => {
        pollMutation.mutate(data);
    };

    return (
        <PageWrapper title="Home">
            <Container maxWidth="sm">
                {!hasVoted && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {poll && (
                            <Stack direction="column" alignItems="center" justifyContent="flex-start" spacing={4}>
                                <img
                                    src={logo}
                                    alt="logo"
                                    title="Dizplai Logo"
                                    style={{ width: '100%', maxWidth: '300px' }}
                                />
                                <Stack direction="column" alignItems="center" justifyContent="flex-start" spacing={2}>
                                    <Typography
                                        variant="h4"
                                        component="h1"
                                        id="options-group-label"
                                        sx={{ color: 'white' }}
                                    >
                                        {poll.name}
                                    </Typography>
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="options-group-label"
                                            defaultValue={poll.options[0]}
                                            name="optionSelected"
                                        >
                                            {poll.options.map((option) => (
                                                <Controller
                                                    name="optionSelected"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <FormControlLabel
                                                            control={
                                                                <Radio
                                                                    {...field}
                                                                    value={option}
                                                                    sx={{ color: 'white' }}
                                                                />
                                                            }
                                                            label={option}
                                                            sx={{ color: 'white' }}
                                                        />
                                                    )}
                                                    key={`option-${option}`}
                                                />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between">
                                    <Button type="submit" variant="contained" startIcon={<HowToVote />}>
                                        Vote
                                    </Button>
                                </Stack>
                            </Stack>
                        )}
                    </form>
                )}
                {pollMutation.data && hasVoted && poll && (
                    <VoteList
                        pollId={pollMutation.data.pollId ?? 0}
                        optionSelected={pollMutation.data.optionSelected}
                        options={poll.options}
                    />
                )}
            </Container>
        </PageWrapper>
    );
};

export default HomePage;
