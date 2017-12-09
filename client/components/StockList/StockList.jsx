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
      <CollapsibleItem key={`my-${symbol}`} header={`${symbol.toUpperCase()} open: ${open} close: ${close} high: ${high} low: ${low} volume: ${volume}`} >
        <div>NEWS GOES HERE</div>
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
