import React from 'react'


class BlockDownload extends React.Component {
  static defaultProps = {
    block: null,
    active: false,
    onClose: () => {},
  }


  render() {
    const {active, block, onClose} = this.props;

    return (
      <div className={`modal ${ active ? 'is-active' : ''}`}>
        <div className='modal-background'></div>
        <div className='modal-content'>
        </div>

        <button
          className='modal-close is-large'
          aria-label='close'
          onClick={onClose}
        ></button>
      </div>
    )
  }
}


export default BlockDownload;
