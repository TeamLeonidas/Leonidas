import React, { Component } from 'react';
import { render } from 'react-dom';
import NavContainer from './Nav/NavContainer';
import MainContainer from './Main/MainContainer';

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
              <NavContainer/>
              <div id="app-container">
                  <MainContainer />
                </div>
            </div> 
        )
    }
}

export default App;