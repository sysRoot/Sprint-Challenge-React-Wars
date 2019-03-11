import React, { Component } from "react";
import "./App.css";
import AvatarStats from "./components/AvatarStats";

class App extends Component {
  constructor() {
    super();
    this.state = {
      urlPageNum: 1,
      starwarsChars: [],
      
    };
  }

  componentDidMount() {
    this.getCharacters(`https://swapi.co/api/people/?page=1`);
  }

  // componentDidUpdate() {
  //   this.getCharacters(`https://swapi.co/api/people/?page=${this.state.urlPageNum}`);
  // }

  getCharacters = URL => {
    // feel free to research what this code is doing.
    // At a high level we are calling an API to fetch some starwars data from the open web.
    // We then take that data and resolve it our state.
    fetch(URL)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        this.setState({ starwarsChars: data.results });
      })
      .catch(err => {
        throw new Error(err);
      });
  };

  // onLoadHandler = event => {

  // };
  cycle = () => {    
    if (this.state.urlPageNum === 1) {
    fetch(`https://swapi.co/api/people/?page=${this.state.urlPageNum}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        this.setState({ urlPageNum: this.state.urlPageNum + 1, starwarsChars: data.results});
      })
      .catch(err => {
        throw new Error(err);
      });
    } else if (this.state.urlPageNum < 10 && this.state.urlPageNum !== 1) {
      this.setState({ urlPageNum: this.state.urlPageNum + 1 })
      fetch(`https://swapi.co/api/people/?page=${this.state.urlPageNum}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        this.setState({ starwarsChars: data.results});
      })
      .catch(err => {
        throw new Error(err);
      });
    } else {
      alert(`You have reached the end, starting at the beginning.`)
      this.setState({ urlPageNum: 1 })
    }
  }

  render() {
    return (
      <div className="App">
        <h1 className="Header">React Wars</h1>
        <AvatarStats data={this.state.starwarsChars} />
        <div className="btnContainer"><button onClick={this.cycle}>Cycle Through</button></div>
      </div>
    );
  }
}

export default App;
