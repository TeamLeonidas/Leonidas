import React, { Component } from 'react';
import { render } from 'react-dom';

// Components
import Navbar from '../Navbar/Navbar.jsx';
import ChildComponent from '../Child/ChildComponent';

class MainContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="main-container" className="bg-white">
        MAIN CONTAINER
        <Navbar />
        <ChildComponent />
      </div>
    )
  }
}

export default MainContainer;
