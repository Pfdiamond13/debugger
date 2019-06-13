import React from 'react';
import ReactDOM from 'react-dom';
import socketIOClient from 'socket.io-client';
import { Pane, Button } from 'evergreen-ui';
import Search from './components/Search';
import Events from './components/Events';

let messageQueue = [];

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchValue: '',
      isLive: true,
      isPaused: false,
      events: [],
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePauseResume = this.handlePauseResume.bind(this);
  }

  componentDidMount() {
    const socket = socketIOClient('http://localhost:3000');
    socket.on('message', (data) => {
      const parsedData = JSON.parse(data);
      if (messageQueue.length >= 500) {
        messageQueue = [...messageQueue.slice(0, 25)];
      }
      messageQueue = [parsedData, ...messageQueue];
    });
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleSearch(e) {
    this.setState({
      searchValue: e.target.value,
    });
  }

  tick() {
    const { isLive } = this.state;
    if (isLive) {
      this.setState({ events: [...messageQueue.slice(0, 25)] });
    }
  }

  handlePauseResume(e) {
    const targetButton = e.target.id;
    if (targetButton === 'live') {
      this.setState({
        isLive: true,
        isPaused: false,
      });
    } else {
      this.setState({
        isLive: false,
        isPaused: true,
        events: [...messageQueue].slice(0, 25),
      });
    }
  }

  render() {
    const { events, isLive, isPaused } = this.state;
    return (
      <Pane>
        <Pane
          height={120}
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="default"
          background="tint2"
        >
          <Button marginLeft={16} isActive={isLive} id="live" onClick={this.handlePauseResume}>Live</Button>
          <Button marginRight={16} isActive={isPaused} id="pause" onClick={this.handlePauseResume}>Pause</Button>
          <Search handleSearch={this.handleSearch} />
        </Pane>
        {events.map((event, index) => <Events event={event} key={index} />)}
      </Pane>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
