import React from 'react';
import styled from 'styled-components';
import { Character } from '../../../../check-pvp-common/models';
import achievementsImg from '../../assets/images/achievements.gif';
import { Flex } from '../../common/styled-components';
import { WOW_CLASS_PROPERTIES } from '../../models/wow-class-properties';
import { getImageUrlPrefix } from '../../util';

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

interface ClassIdProp {
    classId: number;
}

const CharacterNameLink = styled.a<ClassIdProp>`
    color: ${props => WOW_CLASS_PROPERTIES[props.classId].color};
    font-size: 1.1em;
    text-decoration: none;
`;

const GuildLink = styled.a`
    color: yellow;
    text-decoration: none;
`;

const Portrait = styled.img<ClassIdProp>`
    border: 3px solid ${props => WOW_CLASS_PROPERTIES[props.classId].color};
`;

interface Props {
    character: Character;
}

export const SummaryHeader: React.FunctionComponent<Props> = props => {
    const imageUrlPrefix = getImageUrlPrefix(props.character.region);
    const hasGuild = !!props.character.guild;

    return (
        <Flex alignStretch>
            <Portrait src={imageUrlPrefix + props.character.avatarUri} alt="Character avatar" classId={props.character.class} />
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

export default SummaryHeader;