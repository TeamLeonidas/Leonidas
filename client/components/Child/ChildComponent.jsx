import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';

const mapStateToProps = store => ({
    counter: store.main.counter
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        incrementCounter: actions.incrementCounter,
    }, dispatch)
}

class ChildComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="child-component">
                CHILD COMPONENT
                <div>Counter: {this.props.counter}</div>
                <button onClick={this.props.incrementCounter}>Increment Counter</button>
            </div> 
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);