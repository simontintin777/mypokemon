import React, { Component } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import {
  ListGroup,
  ListGroupItem
} from "react-bootstrap"

class MachinesList extends Component {
  render() {
    const { machines } = this.props;
    if (machines.length === 0) {
      return <p>No machines yet!</p>;
    }

    const machinesDisplays = machines.map(machines => {
      var url = `${machines.url}`;
      var stuff = url.split('/');
      var id = stuff[stuff.length - 2];
    
      return (
        <div className="col-sm-6 col-md-4" key={id}>
          <Link to={`/machines/${id}`}  style={{ textDecoration: 'none' }}>
            <ListGroup>
              <ListGroupItem>
                <h3 style={{width: '100%',textAlign: 'center'}}>{`Machine #${id}`}</h3>  
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
            <div className="row">{machinesDisplays}</div>
          </div>
        </div>
      </section>
    );
  }
}

export default MachinesList;