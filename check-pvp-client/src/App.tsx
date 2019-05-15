import React from 'react';
import styled from 'styled-components';

import NavBar from './navbar/NavBar';
import PlayerCheck from './player-check/PlayerCheck';

const Container = styled.div`
  background-color: #151515;
  color: white;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const App: React.FC = () => {
  return (
    <Container>
      <NavBar />
      <PlayerCheck />
    </Container>
  );
}

export default App;
