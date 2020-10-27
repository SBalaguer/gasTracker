import React, {Component} from 'react';
import './App.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import {Typography, Grid} from '@material-ui/core'
import HomePage from './Components/HomePage'
import Add from './Components/AddProject'
import SingleProject from './Components/SingleProject'

import {getSummary} from './Services/api-calls'


export class App extends Component {

  constructor() {
    super();
    this.state = {
      data:[]
    };
  }

  async componentDidMount(){
    try{
      const summary = await getSummary();
      const data = summary.data;
      this.setState({data})
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const data = this.state.data

    return (
      <div className="App">
      <Typography variant="h2" gutterBottom style={{marginTop: '0.5em'}}>
        Gas Calculation Tracker
      </Typography>
      <div>
      <Grid container spacing={2} style={{width:'70%', margin:'0 auto', height:'100%'}}>
      <BrowserRouter>
        <Switch>
        <Route
            path="/"
            exact
            render={props => (
              <HomePage
                data={data}
                {...props}
              />
            )}
          />
        <Route
            path="/add"
            exact
            render={props => (
              <Add
                data={data}
                {...props}
              />
            )}
          />
        <Route
            path="/:id"
            exact
            render={props => (
              <SingleProject
                data={data}
                {...props}
              />
            )}
          />
        </Switch>
        </BrowserRouter>
      </Grid>
      </div>
      <Typography variant="overline" gutterBottom display="block">
        <a href='https://www.santiagobalaguer.com' target="_blank" style={{color: "inherit", textDecoration:"none"}}>Santi Balaguer</a>
      </Typography>
    </div>
    )
  }
}

export default App
