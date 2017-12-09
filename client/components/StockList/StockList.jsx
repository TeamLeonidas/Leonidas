import React from 'react';
import { Collapsible, CollapsibleItem } from 'react-materialize';
import StockItem from './../StockItem/StockItem.jsx';

const StockList = (props) => {
  // const stockItems = Object.keys(props.stockList).map((symbol) => {
  //   return <StockItem key={`my-${symbol}`} symbol={symbol.toUpperCase()} stockInfo={props.stockList[symbol]} />;
  // });
  const stockItems = Object.keys(props.stockList).map((symbol) => {
    const { open, close, high, low, volume } = props.stockList[symbol];
    return (
      <CollapsibleItem header={`${symbol.toUpperCase()} open: ${open} close: ${close} high: ${high} low: ${low} volume: ${volume}`} >
        <div>NEWS GOES HERE</div>
      </CollapsibleItem>
    );
  });
  return (
    <div>
      <h3>My Stocks</h3>
      <Collapsible accordion>
        {stockItems}
      </Collapsible>
    </div>
  );
};

export default StockList;
