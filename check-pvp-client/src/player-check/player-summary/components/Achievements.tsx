import React from 'react';
import styled from 'styled-components';
import { Achievement } from '../../../../../check-pvp-common/models';
import { Heading } from './Heading';

interface Props {
    achievements?: Achievement[]
}

export const Achievements: React.FunctionComponent<Props> = ({achievements}) => {
    return (
        <Heading>Account</Heading>
    );
}