import React from "react";
import styled from "styled-components";
import { Character } from "../../../../check-pvp-common/models";

interface ContainerProps {
  backgroundUrl?: string;
}

const Container = styled.div<ContainerProps>`
  background-image: ${props =>
    props.backgroundUrl ? props.backgroundUrl : "none"};
  background-color: #201e21;
  min-height: 100vh;
  margin-top: 20px;
`;

interface PlayerSummaryProps {
  character?: Character;
}

const PlayerSummary: React.FunctionComponent<PlayerSummaryProps> = props => {
  return <Container />;
};

export default PlayerSummary;
