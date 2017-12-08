import React from 'react';
import { Button, Navbar, NavItem } from 'react-materialize';

const Nav = (props) => {
  return (
    <div id="navbar">
      <form method="GET" action="/oauth/google">
        <Button>Sign in with Google</Button>
      </form>
      {/* <Navbar brand='logo' right>
        <NavItem href='get-started.html'>Getting started</NavItem>
        <NavItem href='components.html'>Components</NavItem>
      </Navbar> */}
    </div>
  );
};

export default Nav;
