import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import qs from 'query-string';
import { Flex } from '../common/styled-components';
import PlayerSearch from './player-search/PlayerSearch';
import RecentCheck from './recent-check/RecentCheck';
import PlayerSummary from './player-summary/PlayerSummary';
import * as fromFeature from './store';
import { isEqualIgnoringCase, getNameAndRealm } from '../util';

const Col = styled.div`
    flex: 1;
    min-width: 550px;

    & + & {
      margin-left: 20px;
    }
`;

interface PlayerCheckRouteProps {
    characterId?: string;
}

const PlayerCheck: React.FunctionComponent<{}> = (props: any) => {
    const { name, realm, region } = qs.parse(props.location.search);
    const characters = fromFeature.selectAllCharacterEntities(props.state);
    const characterIds = fromFeature.selectAllCharacterIds(props.state);
    const searchAction = props[fromFeature.fetchCharacter.type];
    const existingStoreCharacterId = characterIds.find(id =>
        isEqualIgnoringCase(id, `${name}-${realm}-${region}`)
    );

    const handleSearch = (id: string) => {
        const { name, realm } = getNameAndRealm(id);
        props.history.push(`/character?name=${name}&realm=${realm}&region=eu`);
    };

    useEffect(() => {
        if (name && realm && region && !existingStoreCharacterId) {
            searchAction({ name, realm, region: 'eu' });
        }
    }, [searchAction, existingStoreCharacterId, name, realm, region]);

    return (
        <Flex justifyBetween margin="30px 10%">
            <Col>
                <PlayerSearch onSearch={id => handleSearch(id)} />
                <PlayerSummary
                    character={
                        characters && existingStoreCharacterId
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
    [fromFeature.fetchCharacter.type]: fromFeature.fetchCharacter,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerCheck);
