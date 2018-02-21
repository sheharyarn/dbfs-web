import React       from 'react'
import BlockList   from 'app/home/block-list'
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
        <div className='home-left'>
          <h2>Recent Blocks</h2>
          <BlockList blocks={this.state.recent.entries} />
        </div>

        <div className='home-right'>
        </div>
      </div>
    )
  }

}


export default Home;

