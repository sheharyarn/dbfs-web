import React       from 'react'
import { Socket }  from 'phoenix'

import BlockList   from 'app/home/block-list'
import BlockCreate from 'app/home/block-create'
import Title       from 'components/title'
import BulletInfo  from 'components/bullet-info'
import NodeService from 'services/node'
import Constants   from 'lib/constants'



class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'inactive',
      last_hash: null,
      count: {all: 0, files: 0},
      nodes: [],
      recent: {entries: []},
      uploading: false,
    };

    this.showDialog = this.showDialog.bind(this);
    this.readStatusChannel = this.readStatusChannel.bind(this);
  }


  componentDidMount() {
    NodeService
      .index()
      .then((response) => this.setState(response));

    let socket = new Socket(Constants.api.socket(), {params: {}});
    socket.connect();

    let channel = socket.channel("status", {});
    channel.join().receive("ok", response => { console.log("Joined Status Channel") });

    let interval = setInterval(this.readStatusChannel, 1000);

    this.setState({ socket, channel, interval });
  }

  componentWillUnmount() {
    let {socket, interval} = this.state;
    clearInterval(interval);
    socket.disconnect();
    console.log("Disconnecting Socket");
  }


  readStatusChannel() {
    let {channel} = this.state;

    channel.push('get', {})
      .receive("ok", response => {
        console.log("Status Update:", response);
        this.setState({nodes: response.nodes})
      });
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
            <BulletInfo name='No. of Blocks' value={count.all} />
            <BulletInfo name='No. of Files'  value={count.files} />
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
    const klass = (node.sync == 100) ? 'is-primary' : 'is-warning'

    return (
      <li className='node-item' key={node.name}>
        <b>{node.name}</b>
        <span>({node.sync}%)</span>
        <progress className={`progress is-small ${klass}`} value={node.sync} max='100'></progress>
      </li>
    );
  }


  showDialog(bool) {
    this.setState({uploading: bool});
  }

}


export default Home;

