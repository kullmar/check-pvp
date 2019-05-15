import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Flex } from '../styled-components';
import PlayerSearch from './player-search/PlayerSearch';
import RecentCheck from './recent-check/RecentCheck';
import PlayerSummary from './player-summary/PlayerSummary';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

interface PlayerCheckParams {
    characterId: string;
}

interface Props extends RouteComponentProps<PlayerCheckParams> {}

const Col = styled.div`
    width: 49%;
`;

const PlayerCheck: FunctionComponent<Props> = (props) => {
    return (
        <Flex justifyBetween margin="30px 10%">
            <Col>
                <PlayerSearch></PlayerSearch>
                <PlayerSummary></PlayerSummary>
            </Col>
            <Col>
                <RecentCheck></RecentCheck>
            </Col>
        </Flex>
    );
};

export default connect(
    null,
    null
)(PlayerCheck);