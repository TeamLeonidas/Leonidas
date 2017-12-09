import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';

// Components
import SearchBar from './../components/SearchBar/SearchBar.jsx';
import StockList from './../components/StockList/StockList.jsx';
import TopStocks from './../components/TopStocks/TopStocks.jsx';

const mapStateToProps = state => ({
  main: state.main,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    inputChange: actions.inputChange,
    handleKeyPress: actions.handleKeyPress,
    getNews: actions.getNews,
    getStockInfo: actions.getStockInfo,
    searchStock: actions.searchStock,
    retrieveUserInfo: actions.retrieveUserInfo,
    getTopStocks: actions.getTopStocks,
    retrieveMyStocks: actions.retrieveMyStocks,
    searchForMyStocks: actions.searchForMyStocks,
    getStockData: actions.getStockData,
  }, dispatch);
};

class MainContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getTopStocks();
  }

  componentDidMount() {
    this.props.retrieveUserInfo()
    .then(() => this.props.retrieveMyStocks())
    .then(() => this.props.searchForMyStocks());
  }

  // componentDidUpdate() {
  //   this.props.retrieveMyStocks();
  // }

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
        <TopStocks 
          stockList={this.props.main.topStocks} 
          getNews={this.props.getNews}
          getStockData={this.props.getStockData}
        />
        <StockList
          id="my-stocks"
          stockList={this.props.main.stockList}
          getNews={this.props.getNews}
          getStockData={this.props.getStockData}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
