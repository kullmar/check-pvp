import React from 'react';
import styled from 'styled-components';
import { Character } from '../../../../check-pvp-common/models';
import { getImageUrlPrefix } from '../../common/util';
import PlayerSummaryHeader from './PlayerSummaryHeader';

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

const PlayerSummary: React.FunctionComponent<Props> = props => {
    if (!props.character) {
        return <Container />;
    }

    const urlPrefix = getImageUrlPrefix(props.character.region);
    const backgroundUrl = props.character.avatarUri
        ? urlPrefix + props.character.avatarUri.replace('avatar', 'main')
        : undefined;

    return (
        <Container backgroundUrl={backgroundUrl}>
            <PlayerSummaryHeader character={props.character} />
        </Container>
    );
};

export default PlayerSummary;
