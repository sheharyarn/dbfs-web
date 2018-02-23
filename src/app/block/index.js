import React from 'react'
import RawDisplay from 'app/block/raw-display'
import BlockService from 'services/block'


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
    const block = this.state;

    return (
      <div className='block' data-id={block.id}>
        <ul>
          <RawDisplay name='Hash' value={block.hash} />
          <RawDisplay name='Type' value={block.type} />
          <RawDisplay name='Timestamp' value={block.timestamp} />
          <RawDisplay name='Position' value={block.id} />
          <RawDisplay name='Previous' value={block.prev} />
          <RawDisplay name='Signature' value={block.signature} />
          <RawDisplay name='Creator' value={block.creator} />
        </ul>
      </div>
    );
  }
}


export default Block;
