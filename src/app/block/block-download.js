import React from 'react'
import DBFS  from 'lib/dbfs'
import BlockService from 'services/block'


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

    this.close        = this.close.bind(this);
    this.setBusy      = this.setBusy.bind(this);
    this.download     = this.download.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  render() {
    const {active, block} = this.props;

    if (block && block.data && block.data.file_name)
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
    const {block} = this.props;
    const {busy, privateKey} = this.state;

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
              disabled={busy}
              placeholder="Enter your Private Key to download and decrypt the file">
            </textarea>
          </div>
        </div>

        <div className="control">
          <button
            onClick={this.download}
            disabled={busy}
            className={`button is-primary ${busy ? 'is-loading' : ''}`}>
              Download
          </button>
        </div>

      </div>
    );
  }


  download() {
    const {privateKey} = this.state;
    const {block} = this.props;

    if (DBFS.isOwner(block, privateKey)) {
      this.setBusy(true);

      BlockService
        .getFile(block.hash)
        .then((f) => DBFS.decryptDownload(block, f, privateKey))
        .then(() => {
          this.setBusy(false);
          this.close();
        })
        .catch((err) => {
          console.error(err);
          this.setBusy(false);
        })


    } else {
      alert("Entered Key does not match block owner's");
    }
  }


  handleChange(e) {
    this.setState({ privateKey: e.target.value });
  }


  close() {
    if (!this.state.busy)
      this.props.onClose();
  }

  setBusy(busy) {
    this.setState({ busy });
  }

}


export default BlockDownload;
