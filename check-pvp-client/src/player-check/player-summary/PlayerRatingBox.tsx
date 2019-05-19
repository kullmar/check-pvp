import React from 'react';
import styled from 'styled-components';
import { Flex } from '../../common/styled-components';
import {
    Character,
    PvpStats,
    ArenaStats,
} from '../../../../check-pvp-common/models';

const RatingText = styled.div`
    color: #12d9b8;
    font-size: 20px;
`;

const BracketText = styled.div`
    color: #bdbdbd;
    font-size: 12px;
`;

const RatingContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    background-color: #15151573;
    margin: 0 5px;
    padding: 15px 20px;

    &:first-child {
        margin-left: 0;
    }
    &:last-child {
        margin-right: 0;
    }
`;

interface Props {
    stats: PvpStats;
}

const PlayerRatingBox: React.FunctionComponent<Props> = ({ stats }) => {
    return (
        <Flex justifyBetween alignCenter margin="20px 0">
            <RatingContainer>
                <RatingText>{stats.v2.currentRating}</RatingText>
                <BracketText>{`2v2 rating`}</BracketText>
            </RatingContainer>
            <RatingContainer>
                <RatingText>{stats.v3.currentRating}</RatingText>
                <BracketText>{`3v3 rating`}</BracketText>
            </RatingContainer>
        </Flex>
    );
};

export default PlayerRatingBox;
