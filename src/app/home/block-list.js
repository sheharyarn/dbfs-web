import React     from 'react'
import PropTypes from 'prop-types'
import { Link }  from 'react-router-dom'


class BlockList extends React.Component {
  render() {
    const { blocks } = this.props;

    return (
      <div className='tile is-ancestor is-10'>
        <div className='tile is-parent is-vertical is-12'>
          { blocks.map(this.renderBlock) }
        </div>
      </div>
    );
  }


  renderBlock(block) {
    return (
      <Link
        to={`/block/${block.hash}`}
        block-id={block.id}
        key={block.id}
        className='block-list-item tile is-child is-12 notification is-dark'>
          {block.hash}
      </Link>
    );
  }

}


// BlockList.propTypes = {
//   loading: React.PropTypes.bool,

//   // TODO:
//   // Move this to Block component
//   // or maube create a class
//   //
//   // for datra specify oneoftype shapeof 
//   blocks: PropTypes.arrayOf(
//     PropTypes.shapeOf({
//       id:        PropTypes.string,
//       type:      PropTypes.oneOf(blockTypes),
//       data:      PropTypes.object,
//       prev:      PropTypes.string,
//       hash:      PropTypes.string,
//       creator:   PropTypes.string,
//       signature: PropTypes.string,
//       timestamp: PropTypes.string,
//     })
//   ).isRequired,
// };

// BlockList.defaultProps = {
//   blocks:  [],
//   loading: false,
// };



export default BlockList;

