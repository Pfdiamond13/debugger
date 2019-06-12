import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Pane, Button } from 'evergreen-ui';
import Search from './components/Search';
import Events from './components/Events';


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
    axios.get('/api/events')
      .then(response => (
        response.data
      ))
      .then((eventData) => {
        this.setState({
          events: eventData,
        });
      });
  }

  handleSearch(e) {
    this.setState({
      searchValue: e.target.value,
    });
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
