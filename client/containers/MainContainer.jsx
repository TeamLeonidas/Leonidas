import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';

// Components
import Nav from './../components/Nav/Nav.jsx';
import Searchbar from './../components/SearchBar/SearchBar.jsx';

const mapStateToProps = state => ({
  main: state.main,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
      inputChange: actions.inputChange,
      searchStock: actions.searchStock,
      onSubmit: actions.onSubmit,
      handleKeyPress: actions.handleKeyPress,
  }, dispatch);
};

class MainContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="main-container" className="bg-white">
        MAIN CONTAINER
        <Nav />
        <Searchbar
          searchSymbol={this.props.main.searchSymbol}
          inputChange={this.props.inputChange}
          searchStock={this.props.searchStock}
          onSubmit={this.props.onSubmit}
          handleKeyPress={this.props.handleKeyPress}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);