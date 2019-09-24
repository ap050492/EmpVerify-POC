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

class Register extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name:'',
      email:'',
      password:'',
      location:'',
      showAlert: false,
      errorMessage: ''
    }
  }

  onSubmitClick () {
    console.log("Click...")

    let ePassword = sha256(this.state.password);
    console.log(`${serverURL}organisation`);
    console.log(ePassword);
    
    fetch(`${serverURL}organisation`,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: ePassword,
        location: this.state.location
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.status === 200) {
        this.props.history.push('/auth/login')
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
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form">
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input 
                      value= {this.state.name}
                      onChange = {(e)=> this.setState({name:e.target.value})}
                      placeholder="Organisation" 
                      type="text" required/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input 
                      value= {this.state.email}
                      onChange = {(e)=> this.setState({email:e.target.value})}
                      placeholder="Email" 
                      type="email" required/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input 
                      value= {this.state.location}
                      onChange = {(e)=> this.setState({location:e.target.value})}
                      placeholder="Location" 
                      type="location" required/>
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
                      value= {this.state.password}
                      onChange = {(e)=> this.setState({password:e.target.value})}
                      placeholder="Password" 
                      type="password" 
                      pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$" 
                      title="Please include at least 1 uppercase character, 1 lowercase character, and 1 number." 
                      required/>
                  </InputGroup>
                </FormGroup>
                <Row className="my-4">
                  <Col xs="12">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="customCheckRegister"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                      >
                        <span className="text-muted">
                          I agree with the{" "}
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </div>
                  </Col>
                </Row>
                <div className="text-center">
                  <Button className="mt-4" color="primary" onClick={this.onSubmitClick.bind(this)}>
                    Create account
                  </Button>
                </div>
              </Form>
              {this.state.showAlert === true ?
                <div class="alert alert-warning" role="alert">
                  <strong>Error! </strong>{this.state.errorMessage}
                </div> : null}
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default Register;
