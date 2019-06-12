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
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    this.setState({
      searchValue: e.target.value,
    });
  }

  render() {
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
          <Button marginLeft={16}>Pause</Button>
          <Button marginRight={16}>Live</Button>
          <Search handleSearch={this.handleSearch} />
        </Pane>
        <Events />
      </Pane>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
