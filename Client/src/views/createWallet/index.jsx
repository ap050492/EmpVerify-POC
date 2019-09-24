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

class createWallet extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pageCount:0,
      pin:'',
      cPin:'',
      name:'',
      showAlert:false,
      errorMessage:'',
      email:'',
      type:'',
    }
  }

  componentDidMount() {
    const userData = localStorage.getItem('user');
    this.setState({
      name : JSON.parse(userData).name,
      email: JSON.parse(userData).email,
      type: JSON.parse(userData).type,
    })
  }

  onNextClick () {
    this.setState({
      pageCount:1
    })
  }

  onCreateWalletClick() {
    if(this.state.pin === this.state.cPin){
      fetch(`${serverURL}createWallet`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name,
          pin: this.state.pin,
          email: this.state.email
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status === 200) {
            if(this.state.type === 'admin'){
              this.props.history.push('/admin/index')
            } else {
              this.props.history.push('/user/index')
            }
          } else {
            this.setState({
              showAlert: true,
              errorMessage: responseJson.message
            })
            this.resetAlert();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      this.setState({
        showAlert: true,
        errorMessage: "Pin not match!!!"
      })
      this.resetAlert();
    }
  }

  resetAlert(){
    setTimeout(() => {
      this.setState({
        showAlert: false,
        errorMessage: ''
      })
    }, 2000);
  }

  render() {
    return (
      <>
        <Col lg="7">

          <Card className="bg-secondary shadow border-0">

            <CardBody className="px-lg-5 py-lg-5 jus">
              {this.state.pageCount === 0 ?
              <Row>
              <div class="text-center">
                <img src={require('./../../assets/img/wallet.png')} class="col-sm-3" alt="wallet"/>
              </div>
              <div className="text-center mt-5">
                <h3 className="text-dark">Create a new Wallet</h3>
                  <p className="text-lead">
                    New to EmpVerify? Don't worry! We will walk you through the steup process in few minites.
                  </p>
                  <Button className="my-4" color="primary" type="button" onClick={this.onNextClick.bind(this)}>
                    Next
                  </Button>
                </div>
              </Row> :
                <Row>
                <div class="text-center">
                  <img src={require('./../../assets/img/wallet.png')} class="col-sm-2" alt="wallet"/>
                </div>
                <div className="text-center mt-5 col-sm-12">
                <Form role="form">
                <FormGroup className="mb-3 col-sm-">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      value={this.state.name}                      
                      placeholder="wallet"
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
                      value={this.state.pin}
                      maxLength={6}
                      onChange={(e) => this.setState({ pin: e.target.value })}
                      placeholder="Pin"
                      type="password" />
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
                      value={this.state.cPin}
                      maxLength={6}
                      onChange={(e) => this.setState({ cPin: e.target.value })}
                      placeholder="Confirm Pin"
                      type="password" />
                  </InputGroup>
                </FormGroup>
                </Form>
                    <Button className="my-4" color="primary" type="button" onClick={this.onCreateWalletClick.bind(this)}>
                      Create New Wallet
                    </Button>
                  </div>
              </Row>}    
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

export default createWallet;
