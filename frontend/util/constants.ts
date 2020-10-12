const TEST_FETCH_URL = 'http://localhost:5000/sentiment-tweets';
const PROD_FETCH_URL = 'https://twanalyze.herokuapp.com/sentiment-tweets';

export const SENTIMENT_ANALYSIS_URL = __DEV__ ? TEST_FETCH_URL : PROD_FETCH_URL
