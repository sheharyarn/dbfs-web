import React       from 'react'
import NodeService from 'services/node'

import BlockList   from 'app/home/block-list'
import BlockCreate from 'app/home/block-create'
import Title       from 'components/title'
import BulletInfo  from 'components/bullet-info'


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'inactive',
      last_hash: null,
      count: 0,
      nodes: [],
      recent: {entries: []},
      uploading: false,
    };

    this.showDialog = this.showDialog.bind(this);
  }


  componentDidMount() {
    NodeService
      .index()
      .then((response) => this.setState(response));
  }


  render() {
    const {recent, status, count, nodes, uploading} = this.state;

    return (
      <div className='columns'>
        <div className='column is-two-thirds'>
          <Title value='Recent Blocks' />
          <BlockList blocks={recent.entries} />
        </div>

        <div className='column'>
          <Title value='Blockchain Information' />
          <ul>
            <BulletInfo name='App Status'    value={status} />
            <BulletInfo name='No. of Blocks' value={count} />
            <BulletInfo name='No. of Files'  value={count - 1} />
            <BulletInfo name='No. of Nodes'  value={nodes.length} />
          </ul>

          <hr/>

          <Title value='Connected Nodes' />
          <ul>
            { nodes.map(this.renderNode) }
          </ul>

          <hr/>

          <a
            className='notification is-info is-block'
            onClick={() => this.showDialog(true)}>
              Upload File
          </a>

          <BlockCreate
            lastBlock={recent.entries[0]}
            active={uploading}
            onClose={() => this.showDialog(false)}
          />
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


  showDialog(bool) {
    this.setState({uploading: bool});
  }

}


export default Home;

