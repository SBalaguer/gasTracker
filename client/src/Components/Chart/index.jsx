import React, { Component } from 'react'
import moment from 'moment'
import Highcharts from 'highcharts'
import HighchartReact from 'highcharts-react-official'

export class Chart extends Component {

    formatValues = () =>{
        const data = this.props.data.sort((a,b)=> a.day-b.day);
        const categories = data.map(value => moment(value.day*1000).format('ll'))
        const ethFeesUsed = data.map(value => Math.round(value.ethFeesUsed))
        const usdFeesUsed = data.map(value => Math.round(value.usdFeesUsed))
        const series = [
            {
                name:"ETH Fees Used",
                data: ethFeesUsed
            },
            {
                name:"USD Fees Used",
                data: usdFeesUsed
            }
        ]

        return {
            chart: {
                type: 'column',
                zoomType: 'xy'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories
            },
            series
        }
    }

    render() {
        const options = this.formatValues()
        return (
            <div>
                <HighchartReact highcharts={Highcharts} options={options} />
            </div>
        )
    }
}

export default Chart
