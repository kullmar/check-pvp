import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import qs from 'query-string';
import { Flex } from '../common/styled-components';
import PlayerSearch from '../player-search/player-search';
import RecentCheck from './components/recent-check';
import PlayerSummary from './components/player-summary';
import { isEqualIgnoringCase, getNameAndRealm } from '../util';
import { fetchCharacter } from './actions';
import { selectAllCharacterEntities, selectAllCharacterIds } from '../entities/reducer';

const Col = styled.div`
    flex: 1;
    min-width: 550px;

    & + & {
      margin-left: 20px;
    }
`;

const PlayerCheck: React.FunctionComponent<{}> = (props: any) => {
    const { name, realm, region } = qs.parse(props.location.search);
    const characters = selectAllCharacterEntities(props.state);
    const characterIds = selectAllCharacterIds(props.state);
    const searchAction = props[fetchCharacter.type];
    const existingStoreCharacterId = characterIds.find(id => 
        isEqualIgnoringCase(id, `${name}-${realm}-${region}`)
    );
    const isCharacterLoaded = existingStoreCharacterId ? characters[existingStoreCharacterId].avatarUri : false;

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
                <PlayerSummary
                    character={
                        characters && isCharacterLoaded && existingStoreCharacterId
                            ? characters[existingStoreCharacterId]
                            : undefined
                    }
                />
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
    [fetchCharacter.type]: fetchCharacter,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerCheck);