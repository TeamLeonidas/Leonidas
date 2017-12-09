import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';

// Components
import SearchBar from './../components/SearchBar/SearchBar.jsx';
import StockList from './../components/StockList/StockList.jsx';

const mapStateToProps = state => ({
  main: state.main,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    inputChange: actions.inputChange,
    getStockInfo: actions.getStockInfo,
    searchStock: actions.searchStock,
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
        <SearchBar
          searchSymbol={this.props.main.searchSymbol}
          inputChange={this.props.inputChange}
          getStockInfo={this.props.getStockInfo}
          searchStock={this.props.searchStock}
          handleKeyPress={this.props.handleKeyPress}
        />
        {/* <StockList id="top-stocks" stockList={this.props.main.stockList} /> */}
        <StockList id="my-stocks" stockList={this.props.main.stockList} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);