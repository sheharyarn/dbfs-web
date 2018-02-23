import React from 'react'


class RawDisplay extends React.Component {
  render() {
    const {name, value} = this.props;

    return (
      <div className='raw-display'>
        <b>{name}:</b>
        <br/>
        <code>{value}</code>
      </div>
    );
  }
}


export default RawDisplay;

