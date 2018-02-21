import React     from 'react'
import PropTypes from 'prop-types'


const blockTypes = ['zero', 'file_create'];


class BlockItem extends React.Component {
  render() {
    const { block } = this.props;

    return (
      <a id={`block-${block.id}`} className='block-item'>
        {block.hash}
      </a>
    );
  }
}


export default BlockItem;

