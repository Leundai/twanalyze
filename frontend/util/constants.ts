const TEST_FETCH_URL = 'http://0.0.0.0:5000/sentiment-tweets';
const PROD_FETCH_URL = 'http://0.0.0.0:5000/sentiment-tweets';

export const SENTIMENT_ANALYSIS_URL = __DEV__ ? TEST_FETCH_URL : PROD_FETCH_URL
