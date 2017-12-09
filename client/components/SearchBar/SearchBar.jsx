import React from 'react';
import { Input, Row } from 'react-materialize';

const Searchbar = props => (
  <div>
    <Row >
      <Input
        placeholder="Enter Symbol"
        value={props.searchSymbol}
        onChange={e => props.inputChange(e.target.value)}
        onKeyPress={e => props.handleKeyPress(e)}
        s={6}
      />
    </Row>
  </div>
);

export default Searchbar;
