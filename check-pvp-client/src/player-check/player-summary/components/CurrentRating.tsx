import React from 'react';
import styled from 'styled-components';
import { Flex } from '../../../common/styled-components';
import {
    PvpStats
} from '../../../../../check-pvp-common/models';

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
    position: relative;

    &:first-child {
        margin-left: 0;
    }
    &:last-child {
        margin-right: 0;
    }
`;

const Tooltip = styled.div`
    display: none;
    position: absolute;
    left: 100px;
    border: 1px solid silver;
    background: rgba(200,200,200,0.98);
    color: black;
    border-radius: 3px;
    padding: 3px 11px;
    text-shadow: grey 1px 1px 2px;
    width: 90px;
    font-size: 14px;
    font-family: Calibri, Poppins, 'Open Sans', 'Questrial', 'Century Gothic', cursive;

    ${RatingText}:hover ~ &,
    &:hover {
        display: block;
    }
`

interface Props {
    stats: PvpStats;
}

export const CurrentRating: React.FunctionComponent<Props> = ({ stats }) => {
    return (
        <Flex justifyBetween alignCenter margin="20px 0">
            <RatingContainer>
                <RatingText>{stats.v2.currentRating}</RatingText>
                <Tooltip>
                    Wins: {stats.v2.wins} <br/>
                    Losses: {stats.v2.losses} <br/>
                    Total: {stats.v2.wins + stats.v2.losses}
                </Tooltip>
                <BracketText>{`2v2 rating`}</BracketText>
            </RatingContainer>
            <RatingContainer>
                <RatingText>{stats.v3.currentRating}</RatingText>
                <Tooltip>
                    Wins: {stats.v3.wins} <br/>
                    Losses: {stats.v3.losses} <br/>
                    Total: {stats.v3.wins + stats.v3.losses}
                </Tooltip>
                <BracketText>{`3v3 rating`}</BracketText>
            </RatingContainer>
        </Flex>
    );
};

export default CurrentRating;
