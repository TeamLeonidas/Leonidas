import React from 'react';
// import { render } from 'react-dom';

// Components
import Nav from './../components/Nav/Nav.jsx';
import MainContainer from './../containers/MainContainer.jsx';

const App = () =>
  (
    <div>
      <Nav />
      <div id="app-container">
        <MainContainer />
      </div>
    </div>
  );


export default App;
