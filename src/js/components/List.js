import React from 'react';
import PropTypes from 'prop-types';
import ContestItem from './ContestItem';

// Object.keys will return keys in array

const List = ({contests, onContestClick}) => (
  <div className="container">
    <table className="table table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>Category Name</th>
          <th>Contest Name</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(contests).map((contestId) => {
          return <ContestItem
            key={contestId}
            {...contests[contestId]}
            onContestClick={() => onContestClick(contestId)}
          />;
        })}
      </tbody>
    </table>
  </div>
);

List.propTypes = {
  contests: PropTypes.object.isRequired,
  onContestClick: PropTypes.func.isRequired
};

export default List;
