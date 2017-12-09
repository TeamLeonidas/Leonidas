// import React from 'react';
// import ChartistGraph from 'react-chartist'
//
// class Chart extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {stockData:[]}
//   }
//   componentWillMount() {
//     this.props.getStockData(this.props.symbol)
//     .then(json => {
//       this.setState({stockData:json})
//     })
//   }
//   render() {
//     return (
//       <div className="news-tab">
//         {this.state.articles.map((obj, i) => {
//           return (<NewsBox
//             key = {i}
//             title = {obj.title}
//             source = {obj.source.name}
//             author = {obj.author}
//             url = {obj.url}
//             urlToImage = {obj.urlToImage}
//           />)
//         })}
//       </div>
//     )
//   }
// }
//
// export default Chart;
