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
      return <div className="small"><strong>{formattedName}</strong> | <a href="/logout">Log Out</a></div>
    } else {
      return <a href="/oauth/google"><Button className="xsmall">Sign in with Google</Button></a>
    }
  }

  render() {
    return (
      <div id="nav-bar" className="bg-white">
        <div className="nav-inner">
          <div className="logo">
            <img src="https://png.icons8.com/house-lannister/win8/1600" />
            <div className="logo-text h4 fw-600">Leonidas</div>
          </div>
          <div></div>
          <div className="log-in">
            {this.renderLogIn()}
          </div>
        </div>
      </div>
    );
  }
};

export default Nav;
