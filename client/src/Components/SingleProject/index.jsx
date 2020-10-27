import React, { Component } from 'react'
import moment from 'moment'
import {Paper, Typography, Grid, GridList, GridListTile, Button, Icon} from '@material-ui/core'
import {Link} from 'react-router-dom'

import Chart from '../Chart'

import {getProjectInfo} from '../../Services/api-calls'

export class SingleProject extends Component {
    constructor(props){
        super(props);
        this.state={
            project:{},
            data:[],
            overview:{},
            loadingData:true,
            error: false
        }
    }

    async componentDidMount(){
        const projectId = this.props.match.params.id
        try{
            const response = await getProjectInfo(projectId)
            const project = response.data[0].project
            const data = response.data[0].data.sort((a,b)=> a.day-b.day)
            this.setState({data,project, loadingData:false})
        } catch (error) {
            console.log(error);
            this.setState({error:true})
        }

        if(this.props.data.length){
            const overview = this.props.data.filter(project => project.project._id == projectId)[0].data
            this.setState({overview})
        }
    }

    componentDidUpdate(prevProps,prevState,snapshot){
        const projectId = this.props.match.params.id
        if (prevProps.data.length !== this.props.data.length){
            const overview = this.props.data.filter(project => project.project._id == projectId)[0].data
            this.setState({overview})
        }
    }

    render() {

        const formatNumbers = (number, dec) => {
            const amount = dec ? 10 * dec : 1
            const roundNumber = Math.round(number * amount)/amount
            return roundNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        const loadingProps = !this.state.overview.PM

        const projectName = this.state.project.name
        const {loadingData, error, overview, data} = this.state
        const {contracts} = this.state.project
        
        if((loadingProps || loadingData) && !error){
            return <div>Loading</div>
        }else if(!loadingProps && !loadingData){
            return (
                <>
                    <Paper style={{width: '100%', display: "flex", flexDirection:"column", alignItems:'center', marginBottom:"1em"}} >
                        <Typography variant="h5" gutterBottom style={{marginTop: '0.75em', marginBottom:'0.75em'}}>
                            {projectName[0].toUpperCase() + projectName.slice(1,projectName.length)}
                        </Typography>
                        <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <Typography variant="h6">
                                Stats
                            </Typography>
                            <GridList cellHeight={100} cols={2}>
                                <GridListTile key={"PM"} cols={2}>
                                <Paper elevation={0}>
                                    <Typography variant="body1">
                                        Total Spent PM
                                    </Typography>
                                    <Typography variant="body1">
                                        $ {formatNumbers(overview.PM.usdFeesUsed, 0)}
                                    </Typography>
                                    <Typography variant="body2">
                                        Day Average: $ {formatNumbers(overview.PM.usdFeesUsed / overview.PM.count, 0)}
                                    </Typography>
                                </Paper>
                                </GridListTile>
                                <GridListTile key={"P3M"} cols={1}>
                                <Paper elevation={0}>
                                    <Typography variant="body1">
                                        Total Spent P3M
                                    </Typography>
                                    <Typography variant="body1">
                                        $ {formatNumbers(overview.P3M.usdFeesUsed, 0)}
                                    </Typography>
                                    <Typography variant="body2">
                                        Day Average: $ {formatNumbers(overview.P3M.usdFeesUsed / overview.P3M.count, 0)}
                                    </Typography>
                                </Paper>
                                </GridListTile>
                                <GridListTile key={"P6M"} cols={1}>
                                <Paper elevation={0}>
                                    <Typography variant="body1">
                                        Total Spent P6M
                                    </Typography>
                                    <Typography variant="body1">
                                        $ {formatNumbers(overview.P6M.usdFeesUsed, 0)}
                                    </Typography>
                                    <Typography variant="body2">
                                        Day Average: $ {formatNumbers(overview.P6M.usdFeesUsed / overview.P6M.count, 0)}
                                    </Typography>
                                </Paper>
                                </GridListTile>
                                <GridListTile key={"CY"} cols={1}>
                                <Paper elevation={0}>
                                    <Typography variant="body1">
                                        Total Spent 2020
                                    </Typography>
                                    <Typography variant="body1">
                                        $ {formatNumbers(overview.CY.usdFeesUsed, 0)}
                                    </Typography>
                                    <Typography variant="body2">
                                        Day Average: $ {formatNumbers(overview.CY.usdFeesUsed / overview.CY.count, 0)}
                                    </Typography>
                                </Paper>
                                </GridListTile>
                                <GridListTile key={"ALLTIME"} cols={1}>
                                <Paper elevation={0}>
                                    <Typography variant="body1">
                                        Total Spent All Time
                                    </Typography>
                                    <Typography variant="body1">
                                        $ {formatNumbers(overview.STD.usdFeesUsed, 0)}
                                    </Typography>
                                    <Typography variant="body2">
                                        Day Average: $ {formatNumbers(overview.STD.usdFeesUsed / overview.STD.count, 0)}
                                    </Typography>
                                </Paper>
                                </GridListTile>
                            </GridList>
                            <Paper elevation={0}>
                                    <Typography variant="body1">
                                        Contracts being Tracked
                                    </Typography>
                                    {contracts.map((contract,index)=>{
                                        return (<Typography key={contract} variant="body2">
                                        {`${(index+1)}. ${contract}`}
                                    </Typography>)
                                    })}
                                </Paper>
                        </Grid>
                        <Grid item xs={8}>
                            <Chart data={data}/>
                        </Grid>
                        </Grid>
                        <Typography variant="caption" display="block" gutterBottom>
                            Data updated: {moment(data[data.length-1].day*1000).format("D MMMM YYYY")}
                        </Typography>
                    </Paper>
                    <Link to="/" style={{color: "inherit", textDecoration:"none",}}>
                    <Button variant="contained" color="secondary">
                    <Icon style={{marginRight:'0.25em'}}>home</Icon>
                        Go Back
                    </Button>
                    </Link>
                </>
            )
        }else{
            return <div>There was an error</div>
        }
    }
}

export default SingleProject

