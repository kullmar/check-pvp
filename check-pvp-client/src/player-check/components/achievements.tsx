import React from 'react';
import styled from 'styled-components';
import { Achievement } from '../../../../check-pvp-common/models';
import { Heading } from './summary-heading';
import { PVP_ACHIEVEMENT_PROPERTIES } from '../../models/pvp-achievement-properties';
import _ from 'lodash';
import { Flex } from '../../ui-components';
import { AchievementUi } from './achievement-ui';

const Column = styled.div`
    flex: 1;
`;

interface Props {
    achievements?: Achievement[]
}

export const Achievements: React.FunctionComponent<Props> = ({achievements}) => {
    if (!achievements) {
        return <Heading>Account</Heading>;
    }
    return (
        <div>
            <Heading>Account</Heading>
            <Flex margin="0 0 20px">
                <Column>
                    <AchievementUi achievements={achievements} category="2v2"></AchievementUi>
                </Column>
                <Column>
                    <AchievementUi achievements={achievements} category="3v3"></AchievementUi>
                </Column>
            </Flex>
            <Flex>
                <Column>
                    <AchievementUi achievements={achievements} category="gladiator"></AchievementUi>
                </Column>
                <Column>
                    <AchievementUi achievements={achievements} category="rbg"></AchievementUi>
                </Column>
            </Flex>
        </div>
    );
}

const getBest2v2AchievementId = (achievements: Achievement[]) => {
    return _.intersection([1159, 401, 400, 399], achievements.map(achi => achi.id))[0];
}
const getBest3v3AchievementId = (achievements: Achievement[]) => {
    return _.intersection([5267, 5266, 1160, 405, 403, 402], achievements.map(achi => achi.id))[0];
}