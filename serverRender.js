// fetch the data from the api
import config from './config';
import axios from 'axios';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './src/js/App';

const getApiUrl = contestId => {
  return contestId ? `${config.serverUrl}/api/contests/${contestId}` : `${config.serverUrl}/api/contests`;
};

const getInitialData = (contestId, apiData) => {
  return contestId ? {currentContestId: apiData._id, contests: {[apiData._id]:apiData}}
    : {contests: apiData.contests};
};

// connects data to ejs and react so it renders straight to react
const serverRender = (contestId) =>
  axios.get(getApiUrl(contestId))
    .then(resp => {
      const initialData = getInitialData(contestId, resp.data);
      return {
        initialMarkup: ReactDOMServer.renderToString(<App initialData={initialData} />),
        initialData
      };
    }
    );
export default serverRender;
