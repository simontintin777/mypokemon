import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import MachinesPage from "./MachinesPage";
import SingleMachine from "./SingleMachine";


class Pokemon extends Component {

  render() {
    const { match } = this.props;
    const { url } = match;
//alert(url);
    return (
      <div className="row">
        <div className="col-md-12 ">
          <Switch>
            <Route path={`${url}/page/:page`} component={MachinesPage} />
            <Route path={`${url}/:id`} component={SingleMachine} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Pokemon;