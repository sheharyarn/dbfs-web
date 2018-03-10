import React      from 'react'
import FilePicker from 'components/file-picker'

import DBFS         from 'lib/dbfs'
import Utils        from 'lib/utils'
import BlockService from 'services/block'


class BlockCreate extends React.Component {
  static defaultProps = {
    lastBlock: null,
    active: false,
    onClose: () => {},
  }


  constructor(props) {
    super(props);

    this.state = {
      privateKey: '',
      busy: false,
      file: null,
    };

    this.close   = this.close.bind(this);
    this.upload  = this.upload.bind(this);
    this.setBusy = this.setBusy.bind(this);

    this.handleKeyChange  = this.handleKeyChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }


  render() {
    const {active, lastBlock} = this.props;

    if (lastBlock && lastBlock.type)
      return (
        <div className={`modal ${ active ? 'is-active' : ''}`}>
          <div className='modal-background' onClick={this.close}></div>

          <div className='modal-content'>
            { this.renderForm() }
          </div>

          <button
            className='modal-close is-large'
            aria-label='close'
            onClick={this.close}
          ></button>
        </div>
      )

    else
      return null;
  }


  renderForm() {
    const {lastBlock} = this.props;
    const {busy, privateKey, file} = this.state;

    return (
      <div className='box'>
        <h3 className='title is-5'>Upload File</h3>
        <hr className='title-line' />

        <FilePicker
          file={file}
          onSelect={this.handleFileChange}
        />

        <div className="field">
          <label className="label">Private Key</label>
          <div className="control">
            <textarea
              className="textarea key-box"
              value={privateKey}
              onChange={this.handleKeyChange}
              disabled={busy}
              placeholder="Enter your Private Key to encrypt and upload the file">
            </textarea>
          </div>
        </div>

        <div className="control">
          <button
            onClick={this.upload}
            disabled={busy}
            className={`button is-primary ${busy ? 'is-loading' : ''}`}>
              Upload
          </button>
        </div>

      </div>
    );
  }


  upload() {
    const {privateKey, file} = this.state;
    const {lastBlock} = this.props;

    if (file && privateKey) {
      this.setBusy(true);

      Utils.readFile(file, (file) => {
        const blockWithFile = DBFS.createBlock(lastBlock.hash, file, privateKey);

        BlockService
          .create(blockWithFile)
          .then(() => alert('success'))
          .catch((err) => alert('error!'))
      });
    } else {
      alert('Fill required fields first');
    }
  }


  handleKeyChange(e) {
    this.setState({ privateKey: e.target.value });
  }

  handleFileChange(file) {
    this.setState({ file: file });
  }


  close() {
    if (!this.state.busy)
      this.props.onClose();
  }

  setBusy(busy) {
    this.setState({ busy });
  }

}


export default BlockCreate;
