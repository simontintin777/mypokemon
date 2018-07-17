import React, { Component } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import {
  ListGroup,
  ListGroupItem
} from "react-bootstrap"

class BerriesList extends Component {
  render() {
    const { berries } = this.props;
    if (berries.length === 0) {
      return <p>No berries yet!</p>;
    }

    const berriesDisplays = berries.map(berries => {
      var url = `${berries.url}`;
      var stuff = url.split('/');
      var id = stuff[stuff.length - 2];
    
      return (
        <div className="col-sm-6 col-md-4" key={id}>
          <Link to={`/berries/${id}`}  style={{ textDecoration: 'none' }}>
            <ListGroup>
              <ListGroupItem>
                <h3 style={{width: '100%',textAlign: 'center'}}>{berries.name}</h3>  
              </ListGroupItem>
            </ListGroup>                     
          </Link>
        </div>
      );
    });

    return (
      <section>
        <div className="row">
          <div className="col-sm-12">
            <div className="row">{berriesDisplays}</div>
          </div>
        </div>
      </section>
    );
  }
}

export default BerriesList;