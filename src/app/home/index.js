import React       from 'react'
import NodeService from 'services/node'

import BlockList   from 'app/home/block-list'
import BulletInfo  from 'app/home/bullet-info'


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
    const {recent, status, count, nodes} = this.state;
    return (
      <div>
        <div className='home-section home-left'>
          <h2>Recent Blocks</h2>
          <BlockList blocks={recent.entries} />
        </div>

        <div className='home-section home-right'>
          <h2>Blockchain Information</h2>

          <ul>
            <BulletInfo name='App Status'    value={status} />
            <BulletInfo name='No. of Blocks' value={count} />
            <BulletInfo name='No. of Files'  value={count - 1} />
            <BulletInfo name='No. of Nodes'  value={nodes.length} />
          </ul>

          <hr/>

          <h2>Connected Nodes</h2>
          <ul>
            { nodes.map(this.renderNode) }
          </ul>
        </div>
      </div>
    )
  }


  renderNode(node) {
    return (
      <li className='node-item' key={node.name}>
        {node.name} <span>({node.sync}%)</span>
      </li>
    );
  }

}


export default Home;

