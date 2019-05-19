import React from 'react';
import styled from 'styled-components';
import { Flex } from '../../common/styled-components';
import { Character } from '../../../../check-pvp-common/models';
import achievementsImg from '../../assets/images/achievements.gif';
import { getImageUrlPrefix } from '../../common/util';

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

interface Props {
    character: Character;
}

const PlayerSummaryHeader: React.FunctionComponent<Props> = props => {
    const imageUrlPrefix = getImageUrlPrefix(props.character.region);

    return (
        <Flex alignStretch>
            <img src={imageUrlPrefix + props.character.avatarUri} alt="Character avatar" />
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
    )
}

export default PlayerSummaryHeader;