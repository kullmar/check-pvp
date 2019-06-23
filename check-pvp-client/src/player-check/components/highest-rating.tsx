import React from 'react';
import styled from 'styled-components';
import { Character } from '../../../../check-pvp-common/models';
import { Heading } from './summary-heading';

const Text = styled.div`
    padding: 5px 10px 5px 20px;
    color: #cccccc;
    font-size: 13px;
    text-shadow: 1px 1px 5px black;
`;

const ChecksText = styled(Text)`
    color: #ababab;
    font-style: italic;
    font-size: 14px;
    margin-top: 10px;
`;

interface Props {
    character: Character
}

export const HighestRating: React.FunctionComponent<Props> = ({character}) => {
    return(
        <>
            <Heading>Character</Heading>
            <Text>Highest 2 man personal rating: {character.pvpStats.v2.maxRating}</Text>
            <Text>Highest 3 man personal rating: {character.pvpStats.v3.maxRating}</Text>
            <ChecksText>Checked by {character.uniqueChecks || 1} people</ChecksText>
        </>
    );
}

export default HighestRating;