import React  from 'react'
import {Link} from 'react-router-dom'
import utils  from 'lib/utils'

import Title         from 'components/title'
import RawDisplay    from 'components/raw-display'
import BlockService  from 'services/block'
import BlockDelete   from 'app/block/block-delete'
import BlockDownload from 'app/block/block-download'



class Block extends React.Component {
  constructor(props) {
    super(props);

    this.state = {downloading: false, deleting: false, meta: {}};
    this.showDeleteDialog = this.showDeleteDialog.bind(this);
    this.showDownloadDialog = this.showDownloadDialog.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    const prev    = prevProps.match.params.hash;
    const current = this.props.match.params.hash;

    if (prev !== current)
      this.fetchData();
  }


  fetchData() {
    const {hash} = this.props.match.params;

    BlockService
      .get(hash)
      .then((r) => this.setState(r));
  }


  typeIs(type) {
    return (this.state.type === type);
  }

  isDeleted() {
    return (!!this.state.meta.deleted);
  }


  render() {
    const block = this.state;

    return (
      <div className='block' data-block-id={block.id}>
        <div className='columns'>

          <div className='column is-8'>
            <Title value='Block Details' />
            { this.renderData(block) }
          </div>

          <div className='column'>
            <Title value='Actions' />
            { this.renderSidebar(block) }
          </div>

        </div>
      </div>
    );
  }


  renderData(block) {
    return (
      <ul>
        <RawDisplay name='Hash'       value={block.hash} />
        <RawDisplay name='Type'       value={block.type} />
        <RawDisplay name='Timestamp'  value={block.timestamp} />
        <RawDisplay name='Position'   value={block.id} />
        <RawDisplay name='Previous'   value={block.prev} />
        <RawDisplay name='Metadata'   value={utils.prettyJSON(block.data)} />
        <RawDisplay name='Signature'  value={block.signature} />
        <RawDisplay name='Creator'    value={block.creator} />
      </ul>
    );
  }


  renderSidebar(block) {
    const {downloading, deleting} = this.state;

    return (
      <div>
        { utils.renderIf(
            !this.typeIs('file_create'),
            <div className='notification'>
                Unactionable Block
            </div>
        )}

        { utils.renderIf(
            this.isDeleted(),
            <div className='notification'>
                File Deleted
            </div>
        )}


        { utils.renderIf(
            (this.typeIs('file_create') && !this.isDeleted()),
            <a
              className='notification is-dark is-block'
              onClick={() => this.showDownloadDialog(true)}>
                Download File
            </a>
        )}

        { utils.renderIf(
            (this.typeIs('file_create') && !this.isDeleted()),
            <a
              className='notification is-danger is-block'
              onClick={() => this.showDeleteDialog(true)}>
                Delete File
            </a>
        )}

        { utils.renderIf(
            !this.typeIs('zero'),
            <Link
              className='notification is-info is-block'
              to={`/block/${block.prev}`}>
                Previous Block
            </Link>
        )}


        <BlockDownload
          block={block}
          active={downloading}
          onClose={() => this.showDownloadDialog(false)}
        />

        <BlockDelete
          block={block}
          active={deleting}
          onClose={() => this.showDeleteDialog(false)}
        />
      </div>
    );
  }


  showDeleteDialog(bool) {
    this.setState({deleting: bool});
  }

  showDownloadDialog(bool) {
    this.setState({downloading: bool});
  }

}



export default Block;
