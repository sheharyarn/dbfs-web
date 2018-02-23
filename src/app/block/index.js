import React from 'react'
import BlockService from 'services/block'
import BulletInfo  from 'app/home/bullet-info'


class Block extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {hash} = this.props.match.params;

    BlockService
      .get(hash)
      .then((r) => this.setState(r));
  }

  render() {
    let block = this.state;
    console.log(this.state);

    return (
      <div className='block' data-id={block.id}>
        <ul>
          <BulletInfo name='ID' value={block.id} />
          <BulletInfo name='Type' value={block.type} />
          <BulletInfo name='Timestamp' value={block.timestamp} />
          <BulletInfo name='Hash' value={block.hash} />
          <BulletInfo name='Previous' value={block.prev} />
          <BulletInfo name='Signature' value={block.signature} />
          <BulletInfo name='Creator' value={block.creator} />
        </ul>
      </div>
    );
  }
}


export default Block;
