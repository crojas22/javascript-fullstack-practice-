import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Contest extends Component {
  componentDidMount() {
    this.props.fetchNames(this.props.nameIds);
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.addName(this.textInput.value, this.props._id);
    this.textInput.value = '';
  }

  render() {
    return(
      <div>
        <div className="card border-light card-body">
          {this.props.description}
        </div>
        <div className="card border-light mb-3">
          <div className="card-header">Proposed Names</div>
          <ul className="list-group">
            {this.props.nameIds.map((id, index) => {
              return <li key={index} className="list-group-item">{this.props.lookupName(id).name}</li>;
            })}
          </ul>
        </div>
        <div className="card">
          <div className="card-header">Propose a New Name</div>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input className="form-control" type="text" id="addName"
              placeholder="Enter new name here" ref={input => this.textInput = input} required/>
            <button type="submit" className="btn btn-outline-success">Submit</button>
          </form>
        </div>
        <div onClick={this.props.contestListClick}>
          <a className="btn btn-outline-primary" href="/">Contest List</a>
        </div>
      </div>
    );
  }
}

Contest.propTypes = {
  description: PropTypes.string.isRequired,
  contestListClick: PropTypes.func.isRequired,
  nameIds: PropTypes.array.isRequired,
  _id: PropTypes.string.isRequired,
  fetchNames: PropTypes.func.isRequired,
  lookupName: PropTypes.func.isRequired,
  addName: PropTypes.func.isRequired
};

export default Contest;
