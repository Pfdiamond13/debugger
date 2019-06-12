import React from 'react';
import ReactDOM from 'react-dom';
import { Pane, Button } from 'evergreen-ui';
import Search from './components/Search';
import Events from './components/Events';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchValue: '',
      isLive: false,
      isPaused: false,
      events: [{ type: "track", messageId: "ajs-67c7e4d7-1430-48ca-a716-5f6d1cfd85d7", context: { ip: "39.197.248.177", library: { name: "analytics.js", version: "3.0.0" } }, integrations: {}, receivedAt: "2019-06-12T04:00:06.295Z", sentAt: 1560312001295, userId: "592c2a67-18e1-407e-b542-e0b85c59345b", anonymousId: "b9961406-3e3d-4957-b9d2-acbf3c24a294", event: "Experiment Viewed" }, { type: "page", messageId: "ajs-8198cfa0-2991-4418-ab4e-21d8f6f8cec6", context: { ip: "177.233.251.132", library: { name: "analytics.js", version: "3.0.0" } }, integrations: {}, receivedAt: "2019-06-12T04:00:06.296Z", sentAt: 1560312001296, userId: "23c046cf-6955-490e-a4cb-6507bcffeafb", anonymousId: "12592b9c-0d12-413c-849d-393807d764d2", properties: { path: "/", "referrer": "", search: "", title: "ut accusantium ducimus", url: "https://alexa.name" } }]
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePauseResume = this.handlePauseResume.bind(this);
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
        {events.map(event => <Events event={event} />)}
      </Pane>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
