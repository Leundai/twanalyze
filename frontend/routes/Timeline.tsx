import React from 'react';
import { getDummyUserWithTweets } from '../util/getDummyUserWithTweets';

interface Props {}

const Timeline = (props: Props) => {
  const user = getDummyUserWithTweets();

  return <pre>{user.name}</pre>;
};

export default Timeline;
