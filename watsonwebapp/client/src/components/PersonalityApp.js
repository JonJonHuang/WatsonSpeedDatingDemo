import React from 'react';
import axios from 'axios';
class PersonalityApp extends React.Component {
  
  constructor() {
    super();
    this.state = {
      perArr: [],
      matchArr: []
    }
  }
  
  render() {
    var match_text = (
      <>
      <p>You have a match with jonjonH! You matched based on similarities of these qualities:</p>
      <ul>
        <li>Desire for Closeness</li>
        <li>Desire for Challenge</li>
        <li>Emotional Range</li>
      </ul>
      </>
    )
    var no_match_text = (
      <p>Still searching for a match for you...</p>
    )
    console.log(this.props.personalities)
    console.log(this.state.perArr)
    console.log("*****")
    return(
      <div>
        <h1>Personality Chart</h1>
        <Graph personalities={this.state.perArr} />
        {this.props.username==='stephmcflurry'? match_text : no_match_text }
      </div>
    )
  }
  
  sendGetRequest = async (email) => {
    let response = await axios.get('/personality', {params: {email: email}} );
    let foo = response.data;
    this.setState({
      perArr: foo
    })
    console.log(this.state.perArr)
  }

  sendGetMatchRequest = async (email) => {
    let response = await axios.get('/match', {params: {email: email}} );
    let foo = response.data;
    this.setState({
      matchArr: foo
    })
    console.log(this.state.matchArr)
  }
  
  componentDidMount() {
    this.sendGetRequest(this.props.email)
    this.sendGetMatchRequest(this.props.email)
  }
  
}

class Graph extends React.Component {
  state = {}
  render() {
    return(
      <div className="graph-wrapper">
        <div className="graph">
        <BarTextContent personalities={this.props.personalities} />
          <div className="bar-lines-container">
            { this.renderLines() }
            { this.renderBars() }
          </div>
        </div>
      </div>
    )
  }

  renderLines() {
    return Array(10).fill(null).map((el, i) => (
      <Line
        left={i*10}
        key={i}
      />
    ))
  }

  renderBars() {
    const personalities = this.props.personalities;
    return personalities.map((personality) => {
      return (
        <Bar
          percent={personality.val * 100}
          key={personality.name}
        />
      )
    });
  }
}

const BarTextContent = ( {personalities} ) => {
    return (<div className="bar-text-content">
              {
                personalities.map((item) => (
                  <div className="text">
                    {item.name}
                  </div>
                ))
              }
            </div>)
  }

const Line = ({ left }) => {
  return (
    <div
      className="line"
      style={{ left: `${left}%` }}
    />
  )
}

const Bar = ({percent}) => {
  return (
    <div className="bar" style={{ width: `${percent}%` }} />
  )
}

export default PersonalityApp;