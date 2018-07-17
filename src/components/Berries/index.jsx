import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import BerriesPage from "./BerriesPage";
import SingleBerry from "./SingleBerry";


class Pokemon extends Component {

  render() {
    const { match } = this.props;
    const { url } = match;
//alert(url);
    return (
      <div className="row">
        <div className="col-md-12 ">
          <Switch>
            <Route path={`${url}/page/:page`} component={BerriesPage} />
            <Route path={`${url}/:id`} component={SingleBerry} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Pokemon;