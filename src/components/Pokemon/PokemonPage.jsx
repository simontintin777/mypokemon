import React, { Component } from "react";
import axiosInstance from "../utils/axiosInstance";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import PokemonList from "./PokemonList";
import {
  Grid,
  Row,
  Col,
  Button
} from "react-bootstrap"


class PokemonPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemonList: [],
      activePage: undefined
    };
  }

  async loadPokemonList(pageNumber) {
    const url = `pokemon/?limit=20&offset=${pageNumber * 20}`;
    const response = await axiosInstance.get(url);
    
    const resultList = response.data.results;
    this.setState({ 
      pokemonList: resultList ,
      activePage: pageNumber
    });
  }
  
  componentWillMount() {
    const pageNumber = parseInt(this.props.match.params.page);
    this.loadPokemonList(pageNumber);
  }

  async componentWillReceiveProps(nextProps) {
    const pageNumber = nextProps.match.params.page;
    const oldPageNumber = this.props.match.params.page;

    if (pageNumber !== oldPageNumber) {
      await this.loadPokemonList(parseInt(pageNumber));
    }
  }

  render() {
    //alert("Hello -- ");
    let buttonDisplay = null;
    if(this.state.activePage === 0) {
      buttonDisplay = (
        <div>
          <ul class="pager">
            <li class="disabled" >
             <span style={{fontSize: 40}}>Previous</span>
            </li>
            <li>
              <Link to={`/pokemon/page/${this.state.activePage + 1}`}  style={{ textDecoration: 'none' , fontSize: 40}}>Next</Link>
            </li>
          </ul>
        </div>
      );
    } else if (this.state.activePage === 40) {
      buttonDisplay = (
        <div>
          <ul class="pager">
              <li>
                <Link to={`/pokemon/page/${this.state.activePage - 1}`}  style={{ textDecoration: 'none', fontSize: 40 }}>Previous</Link>
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
                <Link to={`/pokemon/page/${this.state.activePage - 1}`}  style={{ textDecoration: 'none', fontSize: 40 }}>Previous</Link>
              </li>
              <li>
                <Link to={`/pokemon/page/${this.state.activePage + 1}`}  style={{ textDecoration: 'none', fontSize: 40 }}>Next</Link>
              </li>
          </ul>
        </div>
        );
    }


    return (
      <div className="pokemonList">
        <Grid>
          <PokemonList pokemon={this.state.pokemonList} />
          <br></br>
          <br></br>
            <Row>
              {buttonDisplay}
            </Row>
        </Grid>
      </div>
    );
  }
}
export default PokemonPage;
