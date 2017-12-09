import React from 'react';
import { Collapsible, CollapsibleItem, Tabs, Tab } from 'react-materialize';
import NewsTab from './../NewsTab/NewsTab.jsx';
import Chart from './../Chart/Chart.jsx';


const StockList = (props) => {
  const stockItems = Object.keys(props.stockList).map((symbol) => {
    const { open, close, high, low, volume } = props.stockList[symbol];
    return (
      <CollapsibleItem key={`my-${symbol}`} header={`${symbol.toUpperCase()} open: ${open} close: ${close} high: ${high} low: ${low} volume: ${volume}`} >
        <div>
          <Tabs className="tab-demo z-depth-1">
            <Tab title="News" active>
              <NewsTab
                getNews={props.getNews}
                symbol={symbol}
              />
            </Tab>
            <Tab title="Chart" >
              <Chart
                getStockData={props.getStockData}
                symbol={symbol}
              />
            </Tab>
          </Tabs>
        </div>
      </CollapsibleItem>
    );
  });

  const title = props.id.split('-').map(x => x[0].toUpperCase() + x.slice(1)).join(' ');
  return (
    <div>
      <h3>{title}</h3>
      <Collapsible accordion>
        {stockItems}
      </Collapsible>
    </div>
  );
};

export default StockList;
