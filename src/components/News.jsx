import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {


capitalizefirstletter=(string)=>{
  return string.charAt(0).toUpperCase() + string.slice(1)
}

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
    document.title=`${this.capitalizefirstletter(this.props.category)} - Newsmon`
  }

  async updatenews(pageNumber) {
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b14af5ea9c5743fcb3ee553bcb7a0b00&page=${pageNumber}&pagesize=${this.props.pagesize}`;
    this.setState({ loading: true });
    this.props.setProgress(10)
    let data = await fetch(url)
    let jsondata = await data.json()
    console.log(jsondata)
    this.setState({
      articles: jsondata.articles,
      totalResults: jsondata.totalResults,
      page: pageNumber,
      loading: false,
    })
    this.props.setProgress(100)
  }

  componentDidMount() {
    this.updatenews(1);
  }

  handlenextclick = async () => {
    console.log("next is clicked");
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize))) {
      this.updatenews(this.state.page + 1);
    }
  };

  fetchMoreData = async () => {
    this.setState({ loading: true });
    const nextPage = this.state.page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b14af5ea9c5743fcb3ee553bcb7a0b00&page=${nextPage}&pagesize=${this.props.pagesize}`;
    let data = await fetch(url)
    let jsondata = await data.json()
    console.log(jsondata)
    const newArticles = jsondata.articles.filter(article => !this.state.articles.find(a => a.url === article.url));
    this.setState({
      articles: [...this.state.articles, ...newArticles],
      totalResults: jsondata.totalResults,
      page: nextPage,
    })
  };

  handlepreviousclick = async () => {
    console.log("previous is clicked");
    if (this.state.page > 1) {
      this.updatenews(this.state.page - 1);
    }
  };

  render() {
    return (
      <>
        <h2 className="text-center" style={{margin:'35px 0px',marginTop:"90px"}}>Newsmon-Top {this.capitalizefirstletter(this.props.category)} Headlines</h2>
          {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row justify-content-center">
          {
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4 my-1" key={element.url}>
                  <NewsItem
                    text={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imgurl={element.urlToImage}
                    newsurl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
                
              );
            })}
        </div>
        </div>
        </InfiniteScroll>
       
      </>
    );
  }
}
News.defaultProps = {
  country: 'in',
  pagesize: 8,
  category: "general"
}
News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string,
}

export default News;