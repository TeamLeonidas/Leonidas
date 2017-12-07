import React, { Component } from 'react';
import { render } from 'react-dom';

class NavContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="nav-container" className="bg-white">
                <div className="nav-inner">
                    NAVIGATION
                </div>
            </div>
        )
    }
}

export default NavContainer;