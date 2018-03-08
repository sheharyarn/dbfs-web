import React from 'react'
import DBFS  from 'lib/dbfs'


class BlockDownload extends React.Component {
  static defaultProps = {
    block: null,
    active: false,
    onClose: () => {},
  }


  constructor(props) {
    super(props);

    this.state = {
      privateKey: '',
      busy: false,
    };

    this.download     = this.download.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    const {privateKey} = this.state;

    return (
      <div className='box'>

        <h3 className='title is-5'>Download {block.data.file_name}</h3>
        <hr className='title-line' />

        <div className="field">
          <label className="label">Decryption Key</label>
          <div className="control">
            <textarea
              className="textarea key-box"
              value={privateKey}
              onChange={this.handleChange}
              placeholder="Enter your Private Key to download and decrypt the file">
            </textarea>
          </div>
        </div>

        <div className="control">
          <button
            onClick={this.download}
            className="button is-primary">
              Download
          </button>
        </div>

      </div>
    );
  }


  download() {
    const {privateKey} = this.state;
    const {block} = this.props;

    alert(DBFS.isOwner(block, privateKey));
  }


  handleChange(e) {
    this.setState({ privateKey: e.target.value });
  }

}


export default BlockDownload;
