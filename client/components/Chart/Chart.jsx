import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {stockInfo: {}, stockData: {}}
  }

  componentWillMount() {
    this.props.getStockData(this.props.symbol)
    .then(json => {
      const jsonValues = Object.values(json)
      this.setState({
        stockInfo: jsonValues[0],
        stockData: jsonValues[1]
      })
    })
  }

  render() {
    const stockClose = Object.values(this.state.stockData).map(obj => {
      if (obj) return obj['4. close'];
    }).reverse()
    const symbol = this.state.stockInfo['2. Symbol']

    const data = {
      labels: Object.keys(this.state.stockData).reverse(),
      datasets: [
        {
          label: 'Close',
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
          data: this.state.stockData && stockClose
        }
      ]
    };

    return (
      <div className='chart'>
        <br />
        <h3>{this.state.stockData && symbol ? symbol.toUpperCase() : symbol}</h3>
        <Line data={data} />
      </div>
    )
  }
}

export default Chart;
