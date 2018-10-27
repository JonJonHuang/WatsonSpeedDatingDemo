import React from 'react';

class PersonalityApp extends React.Component {
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
    return(
      <div>
        <h1>Personality Chart</h1>
        <Graph personalities={this.props.personalities} />
        {this.props.username==='stephmcflurry'? match_text : no_match_text }
      </div>
    )
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
          percent={personality.percentage}
          key={personality.personality}
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
                    {item.personality}
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