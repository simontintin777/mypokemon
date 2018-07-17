import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import PokemonPage from "./PokemonPage";
import SinglePokemon from "./SinglePokemon";


class Pokemon extends Component {

  render() {
    const { match } = this.props;
    const { url } = match;
//alert(url);
    return (
      <div className="row">
        <div className="col-md-12 ">
          <Switch>
            <Route path={`${url}/page/:page`} component={PokemonPage} />
            <Route path={`${url}/:id`} component={SinglePokemon} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Pokemon;