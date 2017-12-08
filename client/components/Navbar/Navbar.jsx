import React from 'react';
import { Button } from 'react-materialize';

const Navbar = (props) => {
  return (
    <div id="navbar">
      <form method="GET" action="/oauth/google">
        <Button>Sign in with Google</Button>
      </form>
    </div>
  );
};

export default Navbar;
