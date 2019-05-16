import React from "react";
import styled from "styled-components";
import { Flex } from "../styled-components";
import PlayerSearch from "./player-search/PlayerSearch";
import RecentCheck from "./recent-check/RecentCheck";
import PlayerSummary from "./player-summary/PlayerSummary";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import * as fromFeature from "./store";
import { getAllEntities } from "./store";

const Col = styled.div`
  width: 49%;
`;

interface PlayerCheckRouteProps {
  characterId?: string;
}

const PlayerCheck = (props: any) => {
  const characterId = props.match.params.characterId;
  const characters = getAllEntities(props.state);
  console.log(!characters);
  if (characterId && !characters) {
    props[fromFeature.search.type](characterId);
  }

  return (
    <Flex justifyBetween margin="30px 10%">
      <Col>
        <PlayerSearch />
        <PlayerSummary character={characterId && characters && characters[characterId]} />
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
