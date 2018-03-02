import React from 'react';


class Title extends React.Component {
  render() {
    const {value} = this.props;

    return (
      <h2 className='title is-4'>{value}</h2>
    );
  }
}

export default Title;
