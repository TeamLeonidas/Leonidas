import React from 'react';

const NewsBox = (props) => {
  return (
    <div className="news-box">
      <a target="_blank" href={props.url}>
        <h4><b>{props.title}</b></h4>
      </a>
      <p>by: {props.author}</p>
      <a target="_blank" href={props.url}>
        <img className='news-img' src={props.urlToImage} />
      </a>
      <p>Source: {props.source}</p>
    </div>
  );
}

export default NewsBox;
