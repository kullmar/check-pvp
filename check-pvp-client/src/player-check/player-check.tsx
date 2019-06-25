import qs from 'query-string';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Flex } from '../ui-components';
import { selectSelectedCharacter } from '../entities/reducer';
import PlayerSearch from '../player-search/player-search';
import { getNameAndRealm } from '../util';
import { loadCharacterRequest } from './actions';
import PlayerSummary from './components/player-summary';
import RecentCheck from './components/recent-check';

const Col = styled.div`
    flex: 1;
    min-width: 550px;

    & + & {
        margin-left: 20px;
    }
`;

const PlayerCheck: React.FunctionComponent<{}> = (props: any) => {    
    const { name, realm, region } = qs.parse(props.location.search);
    const character = selectSelectedCharacter(props.state, props);
    const searchAction = props[loadCharacterRequest.type];
    const isCharacterLoaded = character && character.avatarUri;    

    const handleSearch = (id: string) => {
        const { name, realm } = getNameAndRealm(id);
        props.history.push(`/character?name=${name}&realm=${realm}&region=eu`);
    };

    useEffect(() => {
        if (name && realm && region && !isCharacterLoaded) {
            searchAction({ name, realm, region: 'eu' });
        }
    }, [searchAction, isCharacterLoaded, name, realm, region]);

    return (
        <Flex justifyBetween margin="30px 10%">
            <Col>
                <PlayerSearch onSearch={id => handleSearch(id)} />
                <PlayerSummary character={character} />
            </Col>
            <Col>
                <RecentCheck />
            </Col>
        </Flex>
    );
};

const mapStateToProps = (state: any) => {
    return {
        state,
    };
};

const mapDispatchToProps = {
    [loadCharacterRequest.type]: loadCharacterRequest,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerCheck);
