import React, { Component } from 'react';
import pokeball from './pokeball.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  // Redirect
} from "react-router-dom";
import {
  Grid,
  Row,
  Col
} from "react-bootstrap"
import Part from './components/Part';
import Pokemon from './components/Pokemon';
import Berries from './components/Berries';
import Machines from './components/Machines';
import Introduction from './components/Introduction'
import NotFound from './components/404';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={pokeball} className="App-logo" alt="pokemonlogo" />
              <Link to="/"> <div className="App-title">Pokemon Introduction </div></Link> 
          </header>        
          <div className="App-body">
            <Grid>
              <Row>            
                <Col xs={12} sm={12} md={3}>
                  <nav > 
                    <Part name="pokemon" detail={<p>Pokémon are the creatures that inhabit the world of the Pokémon games. They can be caught using Pokéballs and trained by battling with other Pokémon.</p>}/>                 
                    <Part name="berries" detail={<p>Berries are small fruits that can provide HP and status condition restoration, stat enhancement, and even damage negation when eaten by Pokémon.</p>}/>                 
                    <Part name="machines" detail={<p>Machines are the representation of items that teach moves to Pokémon.They vary from version to version, so it is not certain that one specific TM or HM corresponds to asingle Machine.</p>}/>                  
                  </nav> 
                </Col>          
                <Col xs={12} sm={12} md={9}>
                  <Switch> 
                      <Route path="/pokemon" component={Pokemon}/>
                      <Route path="/berries" component={Berries}/>
                      <Route path="/machines" component={Machines}/>
                      <Route exact path="/" component={Introduction}/>
                      <Route path="/" component={NotFound}/>         
                  </Switch>
                </Col>             
              </Row>
            </Grid>
          </div>
        </div>         
      </Router>
    );
  }
}

export default App;
