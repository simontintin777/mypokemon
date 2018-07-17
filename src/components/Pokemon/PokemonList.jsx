import React, { Component } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import {
  ListGroup,
  ListGroupItem
} from "react-bootstrap"

class PokemonList extends Component {
  render() {
    const { pokemon } = this.props;
    if (pokemon.length === 0) {
      return <p>No pokemon yet!</p>;
    }

    const pokemonDisplays = pokemon.map(pokemon => {
      var url = `${pokemon.url}`;
      var stuff = url.split('/');
      var id = stuff[stuff.length - 2];
      var picId = String("00" + id).slice(-3);
    
      return (
        <div className="col-sm-6 col-md-4" key={id}>
          <Link to={`/pokemon/${id}`}  style={{ textDecoration: 'none' }}>
            <ListGroup>
              <ListGroupItem>
                <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${picId}.png`} alt={`${picId}`}/> 
              </ListGroupItem>
              <ListGroupItem>
                <h3 style={{width: '100%',textAlign: 'center'}}>{pokemon.name}</h3> 
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
            <div className="row">{pokemonDisplays}</div>
          </div>
        </div>
      </section>
    );
  }
}

export default PokemonList;