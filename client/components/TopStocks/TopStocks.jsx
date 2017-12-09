import React, { Component } from 'react';
import { Collapsible, CollapsibleItem, Tabs, Tab } from 'react-materialize';
import NewsTab from './../NewsTab/NewsTab.jsx';

class TopStocks extends Component {
  constructor(props) {
    super(props);
  }

  renderStockList() {
    return this.props.stockList.map((stock, idx) => {
      return (
        <CollapsibleItem key={idx} header={`${stock.symbol} | Change: ${stock.change} | Percent Change: ${stock.percentchange} | High: ${stock.high} | Low: ${stock.low} | Volume: ${stock.volume}`}>
          <div>
            <Tabs className="tab-demo z-depth-1">
              <Tab title="News" active>
                <NewsTab
                  getNews={this.props.getNews}
                  symbol={stock.symbol}
                />
              </Tab>
              <Tab title="Chart" >
                Chart Goes Here
            </Tab>
            </Tabs>
          </div>
        </CollapsibleItem>
      );
    });
  }

  render() {
    return (
      <div>
        <span><h3>Top {this.props.stockList.length} Stocks</h3></span>
        <span className="small">By Highest Daily Percent Change</span>
        <Collapsible accordion>
          {this.props.stockList.length && this.renderStockList()}
        </Collapsible>
      </div>
    );
  }
};

export default TopStocks;
