import React     from 'react'
import PropTypes from 'prop-types'
import BlockItem from 'app/home/block-item'


class BlockList extends React.Component {
  render() {
    const { blocks } = this.props;

    return (
      <div>
        { blocks.map(this.renderBlock) }
      </div>
    );
  }


  renderBlock(block) {
    return (
      <BlockItem key={block.id} block={block} />
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

