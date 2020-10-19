import React, { Component } from 'react'
import {LinearProgress, Typography} from '@material-ui/core'
import {Line} from 'react-chartjs-2';


export class Chart extends Component {
    constructor(props){
        super(props)
    }

    calculateDate = () =>{
        const projectInfo = this.props.data
        const labels = Object.keys(projectInfo);
        console.log(projectInfo)
        const gasData = labels.reduce((acc,label) => [...acc,projectInfo[label].gasUsed],[])
        //const gasData = labels.map((label) => console.log(projectInfo[label]))
        //console.log(gasData)
        const datasets = [
            {
                label: 'Gas Used',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: gasData
              }
        ]

        return {labels, datasets}

    }
      
    render() {
        const data = this.calculateDate()
        return (
            <div>
            <Typography variant="h6" gutterBottom>
                {this.props.project[0].toUpperCase() + this.props.project.slice(1,this.props.project.length)}
            </Typography>
            {this.props.loading? <LinearProgress color="secondary" /> : <Line data={data}/>}
            </div>
        )
    }
}

export default Chart
