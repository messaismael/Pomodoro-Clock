import React from 'react';
import "./register.css"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {register} from './toolUser';
import {Redirect} from 'react-router-dom'

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      active: false,
      isSignedUp: false
    }
    this.data = '';
  }

  componentDidUpdate() {
    if (this.state.isSignedUp) {
      window
        .location
        .reload();
    }

  }

  handleSubmit = async(e) => {
    e.preventDefault();
    this.setState({active: true})
    this.data = await register(this.state.username, this.state.password);
    if (this.data.status === 200) {
      localStorage.setItem("username", this.data.username);
      this.setState({isSignedUp: true})
    } else {
      alert(this.data.username + "already exist")
      this.setState({active: false})
    }
  }

  handlePassword = event => {
    this.setState({password: event.target.value})
  }
  handleUsername = event => {
    this.setState({username: event.target.value})
  }

  render() {
    if (this.state.isSignedUp) {
      // redirect to home if signed up
      return <Redirect to={{
        pathname: "/"
      }}/>;
    } else {
      return (
        <div id='centa'>
          <div id="register" className='col-md-3 col-sm-4'>
            <h2>
              Register</h2>
            <Form onSubmit={(e) => this.handleSubmit(e)}>
              <Form.Group controlId="formBasicUserName">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name='username'
                  disabled={this.state.active}
                  onChange={this.handleUsername}
                  value={this.state.username}
                  placeholder="Enter username"/>
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  disabled={this.state.active}
                  onChange={this.handlePassword}
                  value={this.state.password}
                  placeholder="Enter password"/>
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out"/>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      )
    }
  }
}

export default Register;