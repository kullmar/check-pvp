import React, { useEffect } from "react";
import styled from "styled-components";
import { Flex } from "../styled-components";
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

const PlayerCheck = (props: any) => {
  const characterId = props.match.params.characterId;
  const characters = fromFeature.getAllCharacterEntities(props.state);
  const searchAction = props[fromFeature.search.type];
  useEffect(() => {
    if (!!characterId) {
      searchAction(characterId);
    }
  }, [searchAction, characterId]);

  return (
    <Flex justifyBetween margin="30px 10%">
      <Col>
        <PlayerSearch />
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
  [fromFeature.search.type]: fromFeature.search
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerCheck);
