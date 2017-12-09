import React from 'react';
import { Collapsible, CollapsibleItem } from 'react-materialize';
import StockItem from './../StockItem/StockItem.jsx';
import NewsTab from './../NewsTab/NewsTab.jsx';


const StockList = (props) => {
  // const stockItems = Object.keys(props.stockList).map((symbol) => {
  //   return <StockItem key={`my-${symbol}`} symbol={symbol.toUpperCase()} stockInfo={props.stockList[symbol]} />;
  // });
  const stockItems = Object.keys(props.stockList).map((symbol) => {
    //
    console.log('this is STOCK LIST')
    console.log(props.stockList)
    //
    const { open, close, high, low, volume } = props.stockList[symbol];
    return (
      <CollapsibleItem key={`my-${symbol}`} header={`${symbol.toUpperCase()} open: ${open} close: ${close} high: ${high} low: ${low} volume: ${volume}`} >
        <div>
          <NewsTab
            getNews={props.getNews}
            symbol={symbol}
          />
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
