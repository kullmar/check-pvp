import React from 'react';
import styled from 'styled-components';
import { Character } from '../../../../check-pvp-common/models';
import { getImageUrlPrefix } from '../../common/util';
import PlayerSummaryHeader from './SummaryHeader';
import PlayerRatingBox from './CurrentRating';

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

const PlayerSummary: React.FunctionComponent<Props> = ({ character }) => {
    if (!character) {
        return <Container />;
    }

    const urlPrefix = getImageUrlPrefix(character.region);
    const backgroundUrl = character.avatarUri
        ? urlPrefix + character.avatarUri.replace('avatar', 'main')
        : undefined;

    return (
        <Container backgroundUrl={backgroundUrl}>
            <PlayerSummaryHeader character={character} />
            <PlayerRatingBox stats={character.pvpStats} />
        </Container>
    );
};

export default PlayerSummary;
