import React from 'react';
import styled from 'styled-components';
import { Flex } from '../../ui-components';
import { Achievement } from '../../../../check-pvp-common/models';
import {
    PVP_ACHIEVEMENT_PROPERTIES,
    ALL_2s_ACHIEVEMENT_IDS,
    ALL_3s_ACHIEVEMENT_IDS,
    GLADIATOR_ID,
} from '../../models/pvp-achievement-properties';
import _ from 'lodash';
import moment from 'moment';

const AchievementIcon = styled.img`
    border: 1px solid #676af7;
    display: block;
    margin-right: 5px;
    width: 60px;
`;

const Label = styled.div`
    font-size: 14px;
    color: white;
    text-shadow: 1px 1px 4px black;
`;

const Description = styled.div`
    flex: 1;
    font-size: 11px;
    color: #a7aeb8;
    max-width: 100%;
    text-shadow: 1px 1px 4px black;
    width: 100%;
    word-wrap: break-word;
`;

const Tooltip = styled.div`
    border: 1px solid silver;
    background-color: #15151573;
    display: none;
    font-size: 12px;
    left: 25px;
    padding: 0 5px;
    position: absolute;
    top: 55px;
    z-index: 99;

    ${AchievementIcon}:hover ~ &,
    &:hover {
        display: block;
    }
`;

interface Props {
    achievements: Achievement[];
    category: '2v2' | '3v3' | 'rbg' | 'gladiator';
}

export const AchievementUi: React.FunctionComponent<Props> = ({
    achievements,
    category,
}) => {
    let achis: any[] = [];
    let achiProperties: any[] = [];
    switch (category) {
        case '2v2':
            achis = achievements.filter(achi =>
                ALL_2s_ACHIEVEMENT_IDS.includes(achi.id)
            );
            achiProperties = _.intersection(
                ALL_2s_ACHIEVEMENT_IDS,
                achievements.map(achi => achi.id)
            ).map(id => PVP_ACHIEVEMENT_PROPERTIES[id]);
            break;
        case '3v3':
            achis = achievements.filter(achi =>
                ALL_3s_ACHIEVEMENT_IDS.includes(achi.id)
            );
            achiProperties = _.intersection(
                ALL_3s_ACHIEVEMENT_IDS,
                achievements.map(achi => achi.id)
            ).map(id => PVP_ACHIEVEMENT_PROPERTIES[id]);
            break;
        case 'gladiator':
            achiProperties = [PVP_ACHIEVEMENT_PROPERTIES[GLADIATOR_ID]];
            break;
    }
    if (!achiProperties || achiProperties.length === 0) {
        return null;
    }
    const bestAchi = achiProperties[0];
    const dates = achis.map((achi, index) => (
        <div key={index}>
            {PVP_ACHIEVEMENT_PROPERTIES[achi.id].rating + ": "}
            {moment(achi.timestamp).format("YYYY-MM-DD")}
        </div>
    ));
    const showTooltip = dates.length > 0;
    
    return (
        <Flex alignItems="center" noWrap position="relative">
            <AchievementIcon src={bestAchi.icon} />
            {showTooltip && 
            <Tooltip>
                First achievement:
                {dates}
            </Tooltip> }
            <Flex column width="calc(100% - 65px)">
                <Label>{bestAchi.label}</Label>
                <Description>{bestAchi.description}</Description>
            </Flex>
        </Flex>
    );
};
