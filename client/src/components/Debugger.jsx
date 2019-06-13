import React from 'react';
import socketIOClient from 'socket.io-client';
import { Pane, Button } from 'evergreen-ui';
import Search from './Search';
import Events from './Events';

let eventQueue = [];

class Debugger extends React.Component {
  constructor() {
    super();
    this.state = {
      searchValue: '',
      isLive: true,
      isPaused: false,
      events: [],
      filteredEvents: [],
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.filterEvents = this.filterEvents.bind(this);
    this.handlePauseResume = this.handlePauseResume.bind(this);
  }

  // Initalizes connection to socket.io, checks queue length every message, will clear queue upon reaching 500 events

  componentDidMount() {
    const socket = socketIOClient('http://localhost:3000');
    socket.on('message', (data) => {
      const parsedData = JSON.parse(data);
      if (eventQueue.length >= 500) {
        eventQueue = [...eventQueue.slice(0, 25)];
      }
      eventQueue = [parsedData, ...eventQueue];
    });
    this.interval = setInterval(() => this.liveMessageUpdate(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  // Updates search state upon change, currently only event type is searchable

  handleSearch(e) {
    this.setState({
      searchValue: e.target.value,
      isLive: false,
      isPaused: true,
    }, () => {
      this.filterEvents();
    });
  }

  // Filters events based on their type, begins after matching just one charcter

  filterEvents() {
    const { searchValue, events } = this.state;
    const filteredEventList = events.filter(event => event.type.slice(0, searchValue.length).toLowerCase() === searchValue.toLowerCase());
    if (searchValue === '') {
      this.setState({ filteredEvents: [] });
    } else {
      this.setState({ filteredEvents: [...filteredEventList] });
    }
  }

  // Triggers the live update of events if isLive is true

  liveMessageUpdate() {
    const { isLive } = this.state;
    if (isLive) {
      this.setState({ events: [...eventQueue.slice(0, 25)] });
    }
  }

  // Handles state for both the Live and Pause button

  handlePauseResume(e) {
    const targetButton = e.target.id;
    if (targetButton === 'live') {
      this.setState({
        isLive: true,
        isPaused: false,
        filteredEvents: [],
      });
    } else {
      this.setState({
        isLive: false,
        isPaused: true,
        events: [...eventQueue].slice(0, 25),
      });
    }
  }
  // Will render the most recent 25 events unless filteredEvents has at least 1 index

  render() {
    const {
      events, isLive, isPaused, filteredEvents,
    } = this.state;
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
        {filteredEvents.length > 1 ? filteredEvents.map((event, index) => <Events event={event} key={index} />)
          : events.map((event, index) => <Events event={event} key={index} />)}
      </Pane>
    );
  }
}

export default Debugger;