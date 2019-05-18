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
  console.log(props);
  let backgroundUrl;
  if (props.character) {
    backgroundUrl = props.character.avatarUri.replace('avatar', 'main');
  }
  return <Container backgroundUrl={backgroundUrl} />;
};

export default PlayerSummary;
