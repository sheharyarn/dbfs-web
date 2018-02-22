import React     from 'react'
import PropTypes from 'prop-types'


class BulletInfo extends React.Component {
  render() {
    const {name, value} = this.props;

    return (
      <li>
        <b>{name}:</b> {value}
      </li>
    );
  }
}


export default BulletInfo;
