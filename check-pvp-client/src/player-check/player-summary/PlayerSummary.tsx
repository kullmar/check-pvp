import React, { SFC } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Character } from "../../../../check-pvp-common/models/pvp-stats";

interface ContainerProps {
  backgroundUrl?: string;
};

const Container = styled.div<ContainerProps>`
  background-image: ${props => (props.backgroundUrl ? props.backgroundUrl : 'none')};
  background-color: #201e21;
  min-height: 100vh;
  margin-top: 20px;
`;

const PlayerSummary: SFC<{ character: Character }> = (props) => {
  return <Container />;
};

export default PlayerSummary;
