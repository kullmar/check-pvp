import React from 'react';
import styled from 'styled-components';
import { Character } from '../../../../check-pvp-common/models';
import { getImageUrlPrefix } from '../../util';
import { Achievements } from './achievements';
import { CurrentRating } from './current-rating';
import { HighestRating } from './highest-rating';
import { SummaryHeader } from './summary-header';

interface ContainerProps {
    backgroundUrl?: string;
}

const Container = styled.div<ContainerProps>`
    background-image: ${props =>
        props.backgroundUrl ? `url(${props.backgroundUrl})` : 'none'};
    background-color: #201e21;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 700px;
    margin-top: 20px;
    padding: 25px 30px;
`;

interface Props {
    character?: Character;
}

export const PlayerSummary: React.FunctionComponent<Props> = ({ character }) => {
    if (!character) {
        return <Container />;
    }

    const urlPrefix = getImageUrlPrefix(character.region);
    const backgroundUrl = character.avatarUri
        ? urlPrefix + character.avatarUri.replace('avatar', 'main')
        : undefined;

    return (
        <Container backgroundUrl={backgroundUrl}>
            <SummaryHeader character={character} />
            <CurrentRating stats={character.pvpStats} />
            <HighestRating character={character} />
            <Achievements achievements={character.pvpStats.achievements} />
        </Container>
    );
};

export default PlayerSummary;
