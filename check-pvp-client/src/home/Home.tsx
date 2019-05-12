import React, { SFC } from 'react';
import styled from 'styled-components';
import { Flex } from '../styled-components';
import PlayerSearch from './player-search/PlayerSearch';
import RecentCheck from './recent-check/RecentCheck';
import PlayerSummary from './player-summary/PlayerSummary';

const Col = styled.div`
    width: 49%;
`;

const Home: SFC<{}> = (props) => {
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

export default Home;