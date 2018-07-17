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

class SinglePokemon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      berry: undefined,
      loading: false,
      error: false
    };
  }

  async loadBerryById(berryId) {
    try {
      this.setState({ loading: true });
      const url = `berry/${berryId}/`;
      const response = await axiosInstance.get(url);
      const berry = response.data;
      this.setState({ loading: false, berry, error: false});
    } catch (e) {
      this.setState({ 
        loading: false ,
        error: true
      });
    }
  }

  async componentDidMount() {
    const berryId = this.props.match.params.id;
    await this.loadBerryById(berryId);
  }

  async componentWillReceiveProps(nextProps) {
    const berryId = nextProps.match.params.id;
    const oldBerryId = this.props.match.params.id;

    if (berryId !== oldBerryId) {
      await this.loadBerryById(berryId);
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
    } else if (this.state.berry) {
      const url = this.props.match.url;
      var id = this.state.berry.id;
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
                                        <ListGroupItem header="Id">{this.state.berry.id}</ListGroupItem>
                                        <ListGroupItem header="Name">{this.state.berry.name}</ListGroupItem>
                                        <ListGroupItem header="Growth Time">{this.state.berry.growth_time}</ListGroupItem>
                                        <ListGroupItem header="Max Harverst">{this.state.berry.max_harvest}</ListGroupItem>
                                        <ListGroupItem header="Natural Gift Power">{this.state.berry.natural_gift_power}</ListGroupItem>
                                        <ListGroupItem header="Size">{this.state.berry.size}</ListGroupItem>
                                        <ListGroupItem header="Smoothness">{this.state.berry.smoothness}</ListGroupItem>
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

    return <div className="single-berry-page">{body}</div>;
  }
}

export default SinglePokemon;