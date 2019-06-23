import React from 'react';
import { Achievement } from '../../../../check-pvp-common/models';
import { Heading } from './summary-heading';

interface Props {
    achievements?: Achievement[]
}

export const Achievements: React.FunctionComponent<Props> = ({achievements}) => {
    return (
        <Heading>Account</Heading>
    );
}