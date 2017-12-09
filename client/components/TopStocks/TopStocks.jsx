import React, { Component } from 'react';
import { Collapsible, CollapsibleItem, Tabs, Tab, Dropdown, Button, NavItem } from 'react-materialize';
import NewsTab from './../NewsTab/NewsTab.jsx';
import Chart from './../Chart/Chart.jsx';

class TopStocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterNum: 5,
    };
  }

  renderStockList() {
    return this.props.stockList.slice(0, this.state.filterNum).map((stock, idx) => {
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
              <Tab title="Chart">
                <Chart
                  getStockData={this.props.getStockData}
                  symbol={stock.symbol}
                />
              </Tab>
            </Tabs>
          </div>
        </CollapsibleItem>
      );
    });
  }

  renderStockListFilter() {
    return (
      <Dropdown trigger={<Button className="xsmall" onClick={null}>Filter Top {this.state.filterNum} Stocks</Button> }>
        <NavItem onClick={e => this.filterData(e)}>3</NavItem>
        <NavItem divider />
        <NavItem onClick={e => this.filterData(e)}>5</NavItem>
        <NavItem divider />
        <NavItem onClick={e => this.filterData(e)}>10</NavItem>
        <NavItem divider />
        <NavItem onClick={e => this.filterData(e)}>20</NavItem>
        <NavItem divider />
        <NavItem onClick={e => this.filterData(e)}>30</NavItem>
        <NavItem divider />
        <NavItem onClick={e => this.filterData(e)}>40</NavItem>
        <NavItem divider />
        <NavItem onClick={e => this.filterData(e)}>50</NavItem>
      </Dropdown>
    )
  }

  filterData(e) {
    e.preventDefault();
    this.setState({ filterNum: e.target.innerHTML });
  }

  render() {
    return (
      <div id="top-stocks">
        <div className="top-stocks-header">
          <div className="h3">Top {this.state.filterNum} Stocks</div>
          <div className="small">By Highest Daily Percent Change</div>
          <div>{this.renderStockListFilter()}</div>
        </div>
        <Collapsible accordion>
          {this.props.stockList.length && this.renderStockList()}
        </Collapsible>
      </div>
    );
  }
};

export default TopStocks;
