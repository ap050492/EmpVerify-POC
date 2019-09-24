/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";
import { serverURL } from '../../utils/api';
const sha256 = require('js-sha256');

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      showAlert: false,
      errorMessage: ''
    }
  }

  onSignInClick() {

    let ePassword = sha256(this.state.password);


    fetch(`${serverURL}login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: ePassword,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === 200) {
          localStorage.setItem('user', JSON.stringify(responseJson.data));
          if(responseJson.data.did === ''){
            this.props.history.push('/auth/createWallet');
          } else {
            if(responseJson.data.type === 'admin'){
              this.props.history.push('/admin/index');
            } else {
              this.props.history.push('/user/index');
            }
          }
        } else {
          this.setState({
            showAlert: true,
            errorMessage: responseJson.message
          })

          setTimeout(() => {
            this.setState({
              showAlert: false,
              errorMessage: ''
            })
          }, 2000);
  
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <>
        <Col lg="5" md="7">

          <Card className="bg-secondary shadow border-0">

            <CardBody className="px-lg-5 py-lg-5">

              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      value={this.state.email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                      placeholder="Email"
                      type="email" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      value={this.state.password}
                      onChange={(e) => this.setState({ password: e.target.value })}
                      placeholder="Password"
                      type="password" />
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="button" onClick={this.onSignInClick.bind(this)}>
                    Sign in
                  </Button>
                </div>
              </Form>
              {this.state.showAlert === true ?
                <div class="alert alert-warning" role="alert">
                  <strong>Error! </strong>{this.state.errorMessage}
                </div> : null}
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="/auth/register"
              >
                <small>Create new account</small>
              </a>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

export default Login;
