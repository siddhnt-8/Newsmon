import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <LoadingBar
            height={3}
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route path="/" element={<News setProgress={this.setProgress} pagesize={8} country="us" category="general" key="general-news-1"/>}/>
            <Route path="/business" element={<News setProgress={this.setProgress} pagesize={8} country="us" category="business" key="business-news-2"/>}/>
            <Route path="/entertainment" element={<News setProgress={this.setProgress} pagesize={8} country="us" category="entertainment" key="entertainment-news-3"/>}/>
            <Route path="/health" element={<News setProgress={this.setProgress} pagesize={8} country="us" category="health" key="health-news-4"/>}/>
            <Route path="/general" element={<News setProgress={this.setProgress} pagesize={8} country="us" category="general" key="general-news-5"/>}/>
            <Route path="/science" element={<News setProgress={this.setProgress} pagesize={8} country="us" category="science" key="science-news-6"/>}/>
            <Route path="/sports" element={<News setProgress={this.setProgress} pagesize={8} country="us" category="sports" key="sports-news-7"/>}/>
            <Route path="/technology" element={<News setProgress={this.setProgress} pagesize={8} country="us" category="technology" key="technology-news-8"/>}/>
          </Routes>
        </div>
      </Router>
    );
  }
}