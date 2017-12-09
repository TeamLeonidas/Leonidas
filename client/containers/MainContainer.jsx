import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';

// Components
import Nav from './../components/Nav/Nav.jsx';
import SearchBar from './../components/SearchBar/SearchBar.jsx';
import StockList from './../components/StockList/StockList.jsx';

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
        <SearchBar
          searchSymbol={this.props.main.searchSymbol}
          inputChange={this.props.inputChange}
          searchStock={this.props.searchStock}
          onSubmit={this.props.onSubmit}
          handleKeyPress={this.props.handleKeyPress}
        />
        <StockList stockList={this.props.main.stockList} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);