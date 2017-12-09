import React, { Component } from 'react';
import { render } from 'react-dom';
import NewsBox from './NewsBox.jsx';

// import { Button, Input, Row } from 'react-materialize';

// const topThree = json.articles.slice(3).map((obj, i) => {
//   <NewsBox
//     key = {i}
//     title = {obj.title}
//     source = {obj.source.name}
//     author = {obj.author}
//     url = {obj.url}
//     urlToImage = {obj.urlToImage}
//   />
// })



class NewsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {articles:[]}
  }
  componentWillMount() {
    //google is hardcoded
    this.props.handleExpand('google')
    .then(json => {
      this.setState({articles:json.articles.slice(0, 3)})
    })
  }
  render() {
    console.log('inside NewsTab')
    console.log(this.state)
    return (
      <div className="news-tab">
        {this.state.articles.map((obj, i) => {
          return (<NewsBox
            key = {i}
            title = {obj.title}
            source = {obj.source.name}
            author = {obj.author}
            url = {obj.url}
            urlToImage = {obj.urlToImage}
          />)
        })}
      </div>
    )
  }
}

export default NewsTab;
