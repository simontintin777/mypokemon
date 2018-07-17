import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import {
  ListGroup,
  ListGroupItem,
  Grid,
  Row,
  Col
} from "react-bootstrap"

class SingleMachine extends Component {
  constructor(props) {
    super(props);

    this.state = {
      machine: undefined,
      loading: false,
      error: false
    };
  }

  async loadMachineById(machineId) {
    try {
      this.setState({ loading: true });
      const url = `machine/${machineId}/`;
      const response = await axiosInstance.get(url);
      const machine = response.data;
      this.setState({ loading: false, machine, error: false});
    } catch (e) {
      this.setState({ 
        loading: false ,
        error: true
      });
    }
  }

  async componentDidMount() {
    const machineId = this.props.match.params.id;
    await this.loadMachineById(machineId);
  }

  async componentWillReceiveProps(nextProps) {
    const machineId = nextProps.match.params.id;
    const oldMachineId = this.props.match.params.id;

    if (machineId !== oldMachineId) {
      await this.loadMachineById(machineId);
    }
  }

  render() {
    let body = null;
   // alert(this.state.error );
    if (this.state.error === true) {
      return <Redirect to="/error/" />
    }

    if (this.state.loading) {
      body = <div>Loading...</div>;
    } else if (this.state.machine) {
      const url = this.props.match.url;
      var id = this.state.machine.id;
      var picId = String("00" + id).slice(-3);
      body = (
        <div>
            <Switch>
              <Route
                  path={url}
                  render={() => {
                      return  <div>
                                <Grid>
                                  <br></br>
                                  <Row>
                                    <Col xs={12} sm={6} md={4}></Col>
                                    <Col xs={12} sm={6} md={4}>
                                      <ListGroup style={{width: '100%',textAlign: 'center'}}>
                                        <ListGroupItem header="Id">{this.state.machine.id}</ListGroupItem>
                                        <ListGroupItem header="Item">{this.state.machine.item.name}</ListGroupItem>
                                        <ListGroupItem header="Move">{this.state.machine.move.name}</ListGroupItem>
                                        <ListGroupItem header="Version Group">{this.state.machine.version_group.name}</ListGroupItem>
                                      </ListGroup>
                                    </Col>
                                    <Col xs={12} sm={6} md={4}></Col>
                                  </Row>    
                                </Grid>
                              </div>
                      ;
                  }}
                  />  
            </Switch>
        </div>
      );
    } else {
      body = <div />;
    }

    return <div className="single-machine-page">{body}</div>;
  }
}

export default SingleMachine;