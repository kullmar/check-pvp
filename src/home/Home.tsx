import React, { SFC } from 'react';
import styled from 'styled-components';
import { Flex } from '../styled-components';
import PlayerSearch from './player-search/PlayerSearch';
import RecentCheck from './recent-check/RecentCheck';

const Col = styled.div`
    width: 50%;
`;

const Home: SFC<{}> = (props) => {
    return (
        <Flex margin="30px 10%">
            <Col>
                <PlayerSearch></PlayerSearch>
            </Col>
            <Col>
                <RecentCheck></RecentCheck>
            </Col>
        </Flex>
    );
};

export default Home;