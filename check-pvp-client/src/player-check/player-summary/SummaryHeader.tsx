import React from 'react';
import styled from 'styled-components';
import { Flex } from '../../common/styled-components';
import { Character } from '../../../../check-pvp-common/models';
import achievementsImg from '../../assets/images/achievements.gif';
import { getImageUrlPrefix } from '../../common/util';
import { WOW_CLASS_PROPERTIES } from '../../models/wow-class';

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

interface CharacterNameLinkProps {
    classId: number;
}

const CharacterNameLink = styled.a<CharacterNameLinkProps>`
    color: ${props => WOW_CLASS_PROPERTIES[props.classId].color};
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
    const hasGuild = !!props.character.guild;

    return (
        <Flex alignStretch>
            <img src={imageUrlPrefix + props.character.avatarUri} alt="Character avatar" />
            <TextContainer>
                    <CharacterNameLink classId={props.character.class} href="/">{`${props.character.name}-${
                        props.character.realm
                    }`}</CharacterNameLink>
                { hasGuild ? <GuildLink href="/">{`<${props.character.guild}>`}</GuildLink> : null }
                <ItemLevelText>Average item level equipped</ItemLevelText>
            </TextContainer>
            <AchievementPointsContainer>
                <div><img src={achievementsImg} alt="Blizzard achievement icon" />&nbsp;{ props.character.achievementPoints}</div>
            </AchievementPointsContainer>
        </Flex>
    )
}

export default PlayerSummaryHeader;