import React from 'react';
// import { Button, Input, Row } from 'react-materialize';

const StockItem = props => (
  <div>
    <Row >
      <form>
        <Input type="text" name="symbol" placeholder="Enter Symbol" s={6} />
        <br />
        <Button type="submit" value="submit">Add</Button>
        {/* <Button onSubmit={props.addStock} type="submit" waves='light'>Submit</Button> */}
      </form>
    </Row>
  </div>
);

export default StockItem;
