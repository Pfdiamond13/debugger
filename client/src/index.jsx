import React from 'react';
import ReactDOM from 'react-dom';
import { Pane } from 'evergreen-ui';
import Search from './components/Search';


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
          <Search handleSearch={this.handleSearch} />
        </Pane>
      </Pane>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
