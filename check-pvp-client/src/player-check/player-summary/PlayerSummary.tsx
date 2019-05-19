import React from 'react';
import styled from 'styled-components';
import { Character } from '../../../../check-pvp-common/models';
import { Flex } from '../../styled-components';

interface ContainerProps {
    backgroundUrl?: string;
}

const Container = styled.div<ContainerProps>`
    background-image: ${props =>
        props.backgroundUrl ? `url(${props.backgroundUrl})` : 'none'};
    background-color: #201e21;
    min-height: 100vh;
    margin-top: 20px;
`;

interface PlayerSummaryProps {
    character?: Character;
}

const PlayerSummary: React.FunctionComponent<PlayerSummaryProps> = props => {
    if (!props.character) {
        return <Container />
    }

    const backgroundUrl = props.character.avatarUri ? `https://render-eu.worldofwarcraft.com/character/` + props.character.avatarUri.replace('avatar', 'main') : undefined;


    return (
        <Container backgroundUrl={backgroundUrl}>
            <Flex>
                <img src={"https://render-eu.worldofwarcraft.com/character/" + props.character.avatarUri} />
            </Flex>
        </Container>
    );
};

export default PlayerSummary;
