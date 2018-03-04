import React  from 'react'

import Title        from 'components/title'
import RawDisplay   from 'components/raw-display'
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
      <div className='block' data-block-id={block.id}>
        <div className='columns'>

          <div className='column is-8'>
            <Title value='Block Details' />
            { this.renderData(block) }
          </div>

          <div className='column'>
            <Title value='Actions' />
            { this.renderSidebar(block) }
          </div>

        </div>
      </div>
    );
  }


  renderData(block) {
    return (
      <ul>
        <RawDisplay name='Hash' value={block.hash} />
        <RawDisplay name='Type' value={block.type} />
        <RawDisplay name='Timestamp' value={block.timestamp} />
        <RawDisplay name='Position' value={block.id} />
        <RawDisplay name='Previous' value={block.prev} />
        <RawDisplay name='Signature' value={block.signature} />
        <RawDisplay name='Creator' value={block.creator} />
      </ul>
    );
  }


  renderSidebar(block) {
    return (
      <div>
        <a className='notification is-primary is-block'>
          Download
        </a>
      </div>
    );
  }

}



export default Block;
