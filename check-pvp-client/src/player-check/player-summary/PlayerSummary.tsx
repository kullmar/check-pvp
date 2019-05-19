import React from 'react';
import styled from 'styled-components';
import { Character, Region } from '../../../../check-pvp-common/models';
import { Flex } from '../../common/styled-components';
import achievementsImg from '../../assets/images/achievements.gif';

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

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
`;

const ItemLevelText = styled.div`
    color: #BDBDBD;
    margin-top: auto;
`;

const AchievementPointsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: auto;
`;

const CharacterNameLink = styled.a`
    font-size: 1.1em;
    text-decoration: none;
`;

const GuildLink = styled.a`
    color: yellow;
    text-decoration: none;
`;

interface PlayerSummaryProps {
    character?: Character;
}

const getImageUrlPrefix = (region: Region) =>
    `https://render-${region}.worldofwarcraft.com/character/`;

const PlayerSummary: React.FunctionComponent<PlayerSummaryProps> = props => {
    if (!props.character) {
        return <Container />;
    }

    const urlPrefix = getImageUrlPrefix(props.character.region);
    const backgroundUrl = props.character.avatarUri
        ? urlPrefix + props.character.avatarUri.replace('avatar', 'main')
        : undefined;

    return (
        <Container backgroundUrl={backgroundUrl}>
            <Flex alignStretch>
                <img src={urlPrefix + props.character.avatarUri} alt="Character avatar" />
                <TextContainer>
                        <CharacterNameLink href="/">{`${props.character.name}-${
                            props.character.realm
                        }`}</CharacterNameLink>
                    <GuildLink href="/">{`<${props.character.guild}>`}</GuildLink>
                    <ItemLevelText>Average item level equipped</ItemLevelText>
                </TextContainer>
                <AchievementPointsContainer>
                    <div><img src={achievementsImg} alt="Blizzard achievement icon" />&nbsp;{ props.character.achievementPoints}</div>
                </AchievementPointsContainer>
            </Flex>
        </Container>
    );
};

export default PlayerSummary;
