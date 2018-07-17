import React, { Component } from "react";
import axiosInstance from "../utils/axiosInstance";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import BerriesList from "./BerriesList";
import {
  Grid,
  Row,
  Col,
  Button
} from "react-bootstrap"


class BerriesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      berriesList: [],
      activePage: undefined
    };
  }

  async loadBerriesList(pageNumber) {
    const url = `berry/?limit=20&offset=${pageNumber * 20}`;
    const response = await axiosInstance.get(url);
    
    const resultList = response.data.results;
    this.setState({ 
      berriesList: resultList ,
      activePage: pageNumber
    });
  }
  
  componentWillMount() {
    const pageNumber = parseInt(this.props.match.params.page);
    this.loadBerriesList(pageNumber);
  }

  async componentWillReceiveProps(nextProps) {
    const pageNumber = nextProps.match.params.page;
    const oldPageNumber = this.props.match.params.page;

    if (pageNumber !== oldPageNumber) {
      await this.loadBerriesList(parseInt(pageNumber));
    }
  }

  render() {
    let buttonDisplay = null;
    if(this.state.activePage === 0) {
      buttonDisplay = (
        <div>
          <ul class="pager">
            <li class="disabled">
             <span style={{fontSize: 40}}>Previous</span>
            </li>
            <li>
              <Link to={`/berries/page/${this.state.activePage + 1}`}  style={{ textDecoration: 'none', fontSize: 40 }}>Next</Link>
            </li>
          </ul>
        </div>
      );
    } else if (this.state.activePage === 3) {
      buttonDisplay = (
        <div>
          <ul class="pager">
              <li>
                <Link to={`/berries/page/${this.state.activePage - 1}`}  style={{ textDecoration: 'none', fontSize: 40 }}>Previous</Link>
              </li>
              <li class="disabled">
                <span style={{fontSize: 40}}>Next</span>
              </li>
        </ul>
        </div>
      );
    } else {
      buttonDisplay = (
        <div>
          <ul class="pager">
              <li>
                <Link to={`/berries/page/${this.state.activePage - 1}`}  style={{ textDecoration: 'none', fontSize: 40 }}>Previous</Link>
              </li>
              <li>
                <Link to={`/berries/page/${this.state.activePage + 1}`}  style={{ textDecoration: 'none', fontSize: 40 }}>Next</Link>
              </li>
          </ul>
        </div>
        );
    }


    return (
      <div className="berriesList">
        <Grid>
          <BerriesList berries={this.state.berriesList} />
            <Row>
              {buttonDisplay}
            </Row>
        </Grid>
      </div>
    );
  }
}
export default BerriesPage;
