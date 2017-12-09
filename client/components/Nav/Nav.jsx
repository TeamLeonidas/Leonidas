import React, { Component } from 'react';
import { Button, Navbar, NavItem } from 'react-materialize';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentWillMount() {
    fetch('/auth', { credentials: 'include' }).then(response => response.json()).then(user => {
      this.setState({ user });
    });
  }

  renderLogIn() {
    if(this.state.user.name) {
      const formattedName = this.state.user.name.replace(/"/g, '');
      return <div><strong>{formattedName}</strong> | <a href="/logout">Log Out</a></div>
    } else {
      return <a href="/oauth/google"><Button>Sign in with Google</Button></a>
    }
  }

  render() {
    return (
      <div id="navbar">
        {this.renderLogIn()}
      </div>
    );
  }
};

export default Nav;
