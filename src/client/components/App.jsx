import React from 'react';
import './App.scss';

import { serverSentEventConnect } from 'react-server-sent-event-container';

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      submitNumber: 1,
      numberResponse: "",
    };
  }

  updateInputValue(event) {
    const number = parseInt(event.target.value, 10) || NaN;

    this.setState({
      submitNumber: number
    });
  }

  render() {
    return (
      <div className="App">
        <input type="number" min="1" max="100" name="decimal_number" id="number" onChange={this.updateInputValue.bind(this)} value={this.state.submitNumber} />
        <input type="button" value="Convertir" onClick={() => this.sendNumber()} />
        <span className={"response " + (this.state.numberResponse.length > 0 ? "visible" : "")}>{this.state.numberResponse}</span>
      </div>
    );
  }

  onMessage = (event, source) => {
    const data = JSON.parse(event.data);

    this.setState({
      numberResponse: data.roman,
    });
    source.close();
  };

  sendNumber() {
    const number = this.state.submitNumber;

    const eventSource = new EventSource('http://localhost:3001/sse/convert/' + number);

    eventSource.onmessage = (e) => this.onMessage(e, eventSource);
  };
}
