import React from 'react'
import DBFS  from 'lib/dbfs'
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
    };

    this.close        = this.close.bind(this);
    this.upload       = this.upload.bind(this);
    this.setBusy      = this.setBusy.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    const {busy, privateKey} = this.state;

    return (
      <div className='box'>
      </div>
    );
  }


  upload() {
    const {privateKey} = this.state;
    const {lastBlock} = this.props;

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


export default BlockCreate;
