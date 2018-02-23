import React     from 'react'
import PropTypes from 'prop-types'
import { Link }  from 'react-router-dom'

const blockTypes = ['zero', 'file_create'];


class BlockItem extends React.Component {
  render() {
    const { block } = this.props;

    return (
      <Link to={`/block/${block.hash}`} id={`block-${block.id}`} className='block-item'>
        {block.hash}
      </Link>
    );
  }
}


export default BlockItem;

