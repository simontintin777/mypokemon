import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    // Redirect
  } from "react-router-dom";

class Part extends Component {
    render() {
        return (
            <div className="container">
                <h2>
                    <Link to={`/${this.props.name}/page/0`}>{this.props.name}</Link>
                </h2>
                
                {this.props.detail}
               
            </div>
        )
    }
}

export default Part;