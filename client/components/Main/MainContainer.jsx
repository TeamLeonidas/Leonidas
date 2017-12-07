import React, { Component } from 'react';
import { render } from 'react-dom';

// Components
import ChildComponent from '../Child/ChildComponent';

class MainContainer extends Component {
    constructor(props){
        super(props);
    }
    
    render() {    
        return (
            <div id="main-container" className="bg-white">
                MAIN CONTAINER
                <ChildComponent />
            </div>
        )
    }
}

export default MainContainer;