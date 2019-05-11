import React from 'react';
import styled from 'styled-components';

import NavBar from './navbar/NavBar';
import Home from './home/Home';

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
      <Home></Home>
    </Container>
  );
}

export default App;
