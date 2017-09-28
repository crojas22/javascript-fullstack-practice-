import axios from 'axios';

export const fetchContest = contestId => {
  return axios.get(`/api/contests/${contestId}`)
    .then(resp => resp.data);
};

export const fetchContestList = () => {
  return axios.get('/api/contests')
    .then(resp => resp.data.contests);
};

export const fetchNames = nameIds => {
  // nameIds is an array so need convert it to string and divide it with coma
  return axios.get(`/api/names/${nameIds.join(',')}`)
    .then(resp => resp.data.names);
};

export const addName = (newName, contestId) => {
  return axios.post('/api/names', {newName, contestId})
    .then(resp => resp.data);
};
