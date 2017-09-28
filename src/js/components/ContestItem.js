import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ContestItem extends Component {
  render() {
    return(
      <tr style={{cursor: 'pointer'}} onClick={this.props.onContestClick}>
        <th scope="row">{this.props.id}</th>
        <td>{this.props.categoryName}</td>
        <td>{this.props.contestName}</td>
      </tr>
    );
  }
}

ContestItem.propTypes = {
  _id: PropTypes.string.isRequired,
  categoryName: PropTypes.string.isRequired,
  contestName: PropTypes.string.isRequired,
  onContestClick: PropTypes.func.isRequired
};

export default ContestItem;
