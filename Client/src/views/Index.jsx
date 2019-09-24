import React from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,div, 
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../variables/charts.jsx";
import { serverURL } from '../utils/api';
import Header from "../components/Headers/Header.jsx";

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      organisationList: []
    }
  }
  state = {
    activeNav: 1,
    chartExample1Data: "data1"
  };

  componentDidMount() {
    fetch(`${serverURL}organisation`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.status === 200) {
          this.setState({
            organisationList: responseJson.data
          })
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
    let wow = () => {
      console.log(this.state);
    };
    wow.bind(this);
    setTimeout(() => wow(), 1000);
    // this.chartReference.update();
  };
  componentWillMount() {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }

  renderTableData() {
    return this.state.organisationList.map((organisation, index) => {
      const { id, name, location, email, isActive } = organisation //destructuring
      return (
        <tr key={id}>
          <th scope="row">{name}</th>
          <td>{email}</td>
          <td>{location}</td>
          {isActive === true ?
          <td>            
            <span class="badge badge-dot mr-4">
              <i class="bg-warning"></i>  Pending                      
                      </span>
          </td> :
          <td>
            <span class="badge badge-dot mr-4">
              <i class="bg-success"></i>  Approved
                      </span>
          </td>}
          <td> {isActive === true ? <a href="#!" class="btn btn-sm btn-success">Accept</a>:null}</td>
        </tr>
      )
    })
  }
  render() {
    return (
      <>
      
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Location</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderTableData()}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>  
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>

<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
        </Container>
      </>
    );
  }
}

export default Index;
