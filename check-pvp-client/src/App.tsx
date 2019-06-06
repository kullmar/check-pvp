import React from 'react';
import styled from 'styled-components';

import NavBar from './navbar/NavBar';
import PlayerCheck from './player-check/PlayerCheck';
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from 'react-redux';

const Container = styled.div`
  background-color: #151515;
  color: white;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

interface AppProps {
  characterId?: string;
}

const App = () => {
  return (
    <BrowserRouter>
        <Container>
          <NavBar />
          <Route exact path="/" component={PlayerCheck} />
          <Route path="/character" component={PlayerCheck} />
        </Container>
    </BrowserRouter>

  );
}

export default connect(
  null,
  null
)(App);
