import React from 'react';
import { Button, Input, Row } from 'react-materialize';

const Searchbar = props => (
  <div>
    <Row >
      {/* <form> */}
        <Input
          // type="text"
          // name="symbol"
          placeholder="Enter Symbol"
          value={props.searchSymbol}
          onChange={e => props.inputChange(e.target.value)}
          onKeyPress={(e) => props.handleKeyPress(e)}
          s={6}
        />
        <br />
        {/* <Button onClick={() => props.onSubmit(props.searchSymbol)}>Add</Button> */}
        {/* <Button onSubmit={props.addStock} type="submit" waves='light'>Submit</Button> */}
      {/* </form> */}
    </Row>
  </div>
);

export default Searchbar;
