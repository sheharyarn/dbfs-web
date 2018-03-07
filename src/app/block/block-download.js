import React from 'react'


class BlockDownload extends React.Component {
  static defaultProps = {
    block: null,
    active: false,
    onClose: () => {},
  }


  render() {
    const {active, block, onClose} = this.props;

    if (block && block.data && block.data.file_name)
      return (
        <div className={`modal ${ active ? 'is-active' : ''}`}>
          <div className='modal-background' onClick={onClose}></div>

          <div className='modal-content'>
            { this.renderForm() }
          </div>

          <button
            className='modal-close is-large'
            aria-label='close'
            onClick={onClose}
          ></button>
        </div>
      )

    else
      return null;
  }


  renderForm() {
    const {block} = this.props;

    return (
      <div className='box'>
        <h3 className='title is-5'>Download {block.data.file_name}</h3>
        <hr className='title-line' />

        <div className="field">
          <label className="label">Decryption Key</label>
          <div className="control">
            <textarea
              className="textarea key-box"
              placeholder="Enter your Private Key to download and decrypt the file">
            </textarea>
          </div>
        </div>

        <div className="control">
          <button className="button is-primary">Download</button>
        </div>
      </div>
    );
  }

}


export default BlockDownload;
