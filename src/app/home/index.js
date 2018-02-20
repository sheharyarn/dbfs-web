import React from 'react'
import NodeService from 'services/node'


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'inactive',
      last_hash: null,
      count: 0,
      nodes: [],
      recent: {entries: []},
    };
  }

  componentDidMount() {
    NodeService
      .index()
      .then((response) => this.setState(response));
  }

  render() {
    return (
      <div>
        <h1>Homepage</h1>

        <code>{JSON.stringify(this.state)}</code>
      </div>
    )
  }
}

export default Home;

