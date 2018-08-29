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
import ReactDOM from "react-dom";
import ReactHighcharts from "react-highcharts";


class BerriesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      berriesList: [],
      growth_time: [],
      shortTime: [],
      longTime: [],
      config : {},
      activePage: undefined
    };
    this.shortTime = this.shortTime.bind(this);
    this.longTime = this.longTime.bind(this);
    this.back = this.back.bind(this);
  }
  shortTime() {
    const shortConfig = this.setupConfig(this.state.shortTime);
    this.setState({
      config: shortConfig
    })
  }
  longTime() {
    const longConfig = this.setupConfig(this.state.longTime);
    this.setState({
      config: longConfig
    })
  }
  back() {
    const back = this.setupConfig(this.state.growth_time);
    this.setState({
      config: back
    })
  }

  async dataDeal(results) {
    var listArr = [];
    var map = new Map();       
    await Promise.all(results.map(async (el) => {
        const urlArr = el.url.split("/");
        const id = urlArr[urlArr.length-2];
        const idUrl = `berry/${id}`;
        //alert(idUrl);
        let data = await axiosInstance.get(idUrl);        
        var newdata = data.data;
        //console.log(data);
        if(map.has(newdata.growth_time) === true) {
            map.set(newdata.growth_time, map.get(newdata.growth_time)+1);
        } else {
            map.set(newdata.growth_time,1); 
        }
    }));
    for (var [key, value] of map) {
      listArr.push({
            name: key,
            y: value
          }); 
    }
    return listArr;
  }

  setupConfig(data) {
    const everyConfig = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
          text: 'Berries Growth Time Distribution'
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                  style: {
                      color: 'black'
                  }
              }
          }
      },
      series: [{
          name: 'Brands',
          colorByPoint: true,
          data: data
      }]
    }
    return everyConfig;
  }

  async loadBerriesList(pageNumber) {
    const url = `berry/?limit=20&offset=${pageNumber * 20}`;
    const response = await axiosInstance.get(url);
    const resultList = response.data.results;
    let growth_time_count = [];
    growth_time_count = await this.dataDeal(resultList);
    let shortTime_count = growth_time_count.filter((x) => x.name >=1 && x.name <= 6);
    let longTime_count = growth_time_count.filter((x) => x.name > 6);
    this.setState({ 
      berriesList: resultList ,
      activePage: pageNumber,
      growth_time: growth_time_count,
      shortTime: shortTime_count,
      longTime: longTime_count
    });
    const config = this.setupConfig(this.state.growth_time);

    this.setState({
      config
    })
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
            <br></br>
            <Row>
            <button onClick={this.shortTime}>
              Short Time Growth(1-6)
            </button> 
            <button onClick={this.longTime}>
              Long Time Growth(7-50)
            </button>   
            <button onClick={this.back}>
              Back
            </button>     
            </Row>
            <Row>
              <ReactHighcharts config = {this.state.config}></ReactHighcharts>
            </Row>
            <Row>
              {buttonDisplay}
            </Row>
        </Grid>
      </div>
    );
  }
}

export default BerriesPage;
