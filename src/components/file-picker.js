import React from 'react'
import utils from 'lib/utils'


class FilePicker extends React.Component {
  static defaultProps = {
    label: 'Select a File',
    file: null,
    onRead: null,
    onSelect: null,
  }


  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(e) {
    const {onSelect, onRead} = this.props;
    const file = e.target.files[0];


    if (onSelect && file)
      onSelect(file);


    if (onRead && file)
      utils.readFile(file, onRead);
  }


  renderFileName() {
    const {file} = this.props;

    if (file && file.name)
      return file.name;
    else
      return 'No File Selected';
  }


  render() {
    const {label, file, onSelect} = this.props;

    return (
      <div className='field'>
        <div className='file is-boxed has-name is-fullwidth is-centered'>

          <label className='file-label'>
            <input
              className='file-input'
              type='file'
              onChange={this.handleChange}
            />

            <span className='file-cta'>
              <span className='file-icon'>
                <i className='fas fa-upload'></i>
              </span>

              <span className='file-label has-text-centered'>
                {label}
              </span>
            </span>

            <span className='file-name has-text-centered'>
              { this.renderFileName() }
            </span>
          </label>

        </div>
      </div>
    );
  }
}


export default FilePicker;
