import React, { useEffect } from "react";
import styled from "styled-components";
import { Flex } from "../common/styled-components";
import PlayerSearch from "./player-search/PlayerSearch";
import RecentCheck from "./recent-check/RecentCheck";
import PlayerSummary from "./player-summary/PlayerSummary";
import { connect } from "react-redux";
import * as fromFeature from "./store";

const Col = styled.div`
  width: 49%;
`;

interface PlayerCheckRouteProps {
  characterId?: string;
}

const PlayerCheck: React.FunctionComponent<{}> = (props: any) => {
  const characterId = props.match.params.characterId;
  const characters = fromFeature.selectAllCharacterEntities(props.state);
  const characterIds = fromFeature.selectAllCharacterIds(props.state);
  const searchAction = props[fromFeature.fetchCharacter.type];
  useEffect(() => {
    if (!!characterId && !characterIds.includes(characterId)) {
      searchAction(characterId);
    }
  }, [searchAction, characterId, characterIds]);



  return (
    <Flex justifyBetween margin="30px 10%">
      <Col>
        <PlayerSearch onSearch={id => props.history.push(`../${id}`)}/>
        <PlayerSummary character={characters && characters[characterId]} />
      </Col>
      <Col>
        <RecentCheck />
      </Col>
    </Flex>
  );
};

const mapStateToProps = (state: any) => {
  return {
    state
  };
};

const mapDispatchToProps = {
  [fromFeature.fetchCharacter.type]: fromFeature.fetchCharacter
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerCheck);
