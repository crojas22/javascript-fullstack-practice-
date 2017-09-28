import React, {Component} from 'react';
import Header from './components/Header';
import List from './components/List';
import Contest from './components/Contest';
import * as api from '../api';
import PropTypes from 'prop-types';

const pushState = (obj, url) => window.history.pushState(obj, '', url);
// so browser back and forward button can work with server rendering
const onPopState = handler => {
  window.onpopstate = handler;
};

class App extends Component {
  constructor(props){
    super(props);
    this.state = this.props.initialData;
  }

  componentDidMount() {
    onPopState((event) => {
      this.setState({
        currentContestId: (event.state || {}).currentContestId
      });
    });
  }

  componentWillUnmount() {
    //to clear onPopState
    onPopState(null);
  }

  fetchContest = (contestId) => {
    pushState({currentContestId: contestId}, `/contest/${contestId}`);

    api.fetchContest(contestId).then(contest => {
      this.setState({
        currentContestId: contest._id,
        contests: {
          ...this.state.contests,
          [contest._id]: contest
        }
      });
    });
  }
  // to render main page from server when clicking link to return to homepage
  fetchContestList = () => {
    pushState({currentContestId: null}, '/');

    api.fetchContestList().then(contests => {
      this.setState({
        currentContestId: null,
        contests
      });
    });
  }

  fetchNames = (nameIds) => {
    if(nameIds.length === 0) {
      return;
    }
    api.fetchNames(nameIds).then(names => {
      this.setState({
        names
      });
    });
  }

  addName = (newName, contestId) => {
    api.addName(newName, contestId).then(resp =>
      this.setState({
        contests: {
          ...this.state.contests,
          [resp.updatedContest._id]: resp.updatedContest
        },
        names: {
          ...this.state.names,
          [resp.newName._id]: resp.newName
        }
      })
    );
  }

  lookupName = id => !this.state.names || !this.state.names[id] ?
    {name: '...'} : this.state.names[id];

  pageHeader = () => {
    return this.state.currentContestId ? this.state.contests[this.state.currentContestId].contestName
      : 'Naming Contest';
  }

  render() {
    return(
      <div className="container">
        <Header title={this.pageHeader()} />
        {
          (this.state.currentContestId) ? <Contest contestListClick={this.fetchContestList}
            {...this.state.contests[this.state.currentContestId]}
            fetchNames={this.fetchNames} lookupName = {this.lookupName}
            addName={this.addName}
          />
            : <List onContestClick={this.fetchContest} contests={this.state.contests} />
        }
      </div>
    );
  }
}

App.propTypes = {
  initialData: PropTypes.object.isRequired
};

export default App;
