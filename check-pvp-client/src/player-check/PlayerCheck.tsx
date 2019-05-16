import React from "react";
import styled from "styled-components";
import { Flex } from "../styled-components";
import PlayerSearch from "./player-search/PlayerSearch";
import RecentCheck from "./recent-check/RecentCheck";
import PlayerSummary from "./player-summary/PlayerSummary";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

const Col = styled.div`
  width: 49%;
`;

interface PlayerCheckProps {
  characterId?: string;
}

const PlayerCheck = ({ match }: RouteComponentProps<PlayerCheckProps>) => {
  const characterId = match.params.characterId;

  return (
    <Flex justifyBetween margin="30px 10%">
      <Col>
        <PlayerSearch />
        <PlayerSummary character={undefined} />
      </Col>
      <Col>
        <RecentCheck />
      </Col>
    </Flex>
  );
};

export default connect(
  null,
  null
)(PlayerCheck);
