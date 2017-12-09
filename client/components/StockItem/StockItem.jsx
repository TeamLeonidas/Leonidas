import React from 'react';
import { CollapsibleItem } from 'react-materialize';

const StockItem = (props) => {
  const { symbol } = props;
  const { open, close, high, low, volume } = props.stockInfo;

  return (
    <div>
      {/* <CollapsibleItem header={`${open}, ${close}, ${high}, ${low}, ${volume}`} > */}
      <CollapsibleItem header={`${symbol.toUpperCase()} open: ${open} close: ${close} high: ${high} low: ${low} volume: ${volume}`} >
        Lorem ipsum dolor sit amet.
      </CollapsibleItem>
    </div>
  );
};

export default StockItem;
