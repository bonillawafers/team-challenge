import React, { Component } from 'react';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';
<<<<<<< HEAD
import SignUpForm from './TeamSignUp.js';
//import {Alert} from './TeamSignUp.js';
=======
import SignUpForm from './TeamSignUp';
>>>>>>> master

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">

          <h2>Sign Up!</h2>
        </div>
        <p className="App-intro">
          Our service is hella lit but you must be at least 13 years old to join
        </p>
        <SignUpForm />
      </div>
    );
  }
}

export default App;
