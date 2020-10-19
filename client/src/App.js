import React, {Component} from 'react';
import './App.css';
import ProjectData from './Components/ProjectData'
import AddProject from './Components/AddProject'
import Chart from './Components/Chart'
import {Grid, Paper} from '@material-ui/core'
import {Typography} from '@material-ui/core'

// import {getData} from './Services/api-calls'

// import contractsInfo from './Static/contractInfo.json'


export class App extends Component {

  constructor() {
    super();
    this.state = {
      loading: {},
      projects:{},
      show:{}
    };
  }

  setShow = (project) =>{
    if(typeof this.state.show[project] !== 'undefined'){
      const show = {...this.state.show, [project]:!this.state.show[project]}
      this.setState({show})
    }else{
      const show = {...this.state.show, [project]:true}
      this.setState({show})
    }
  }

  setLoading = (project) => {
    if(typeof this.state.loading[project] !== 'undefined'){
      const loading = {...this.state.loading, [project]:false}
      this.setState({loading})
    }else{
      const loading = {...this.state.loading, [project]:true}
      this.setState({loading})
    }
  }

  setProject = (project) => {
    const projects = {...this.state.projects, [Object.keys(project)[0]]:project[Object.keys(project)[0]]}
    this.setState({projects})
  }

  render() {
    const projects = this.state.projects
    const projectsSelected = !!Object.keys(this.state.projects).length

    return (
      <div className="App">
      <Typography variant="h2" gutterBottom>
        Gas Calculation Tracker
      </Typography>
      <Grid container spacing={2} style={{width:'90%', margin:'0 auto', height:'100%'}}>
        <Grid item xs={4}>
          <Paper>
            <ProjectData loading={this.state.loading} setProject={this.setProject} setShow={this.setShow} state={this.state} setLoading={this.setLoading} />
          </Paper>
          {/* <Paper>
            <AddProject />
          </Paper> */}
        </Grid>
        <Grid item xs={8}>
          {projectsSelected ? Object.keys(projects).map(projectName =>{
          if(this.state.show[projectName]){
          return (<Paper>
            <Chart loading={this.state.loading[projectName]} project={projectName} data={this.state.projects[projectName]} />
          </Paper>)
          }else{
            return(<></>)
          }
          }): <p>Please select a project</p>}
        </Grid>
        </Grid>
    </div>
    )
  }
}

export default App
