import React from 'react';
import styled from 'styled-components';
import { Character } from '../../../../../check-pvp-common/models';

const Header = styled.div`
    padding: 10px 10px;
    background-color: #15151573;
    color: #BDBDBD;
    font-size: 1.17em;
    font-weight: bold;
`;

const Text = styled.div`
    padding: 5px 10px 5px 20px;
    color: #cccccc;
    font-size: 13px;
    text-shadow: 1px 1px 5px black;
`;

interface Props {
    character: Character
}

export const HighestRating: React.FunctionComponent<Props> = ({character}) => {
    return(
        <>
            <Header>Character</Header>
            <Text>Highest 2 man personal rating: {character.pvpStats.v2.maxRating}</Text>
            <Text>Highest 3 man personal rating: {character.pvpStats.v3.maxRating}</Text>
        </>
    );
}

export default HighestRating;