import React from 'react';
import { getDummyUserWithTweets } from '../util/getDummyUserWithTweets';

interface Props {}

const Timeline = (props: Props) => {
  const user = getDummyUserWithTweets();

  return <div>{user.name}</div>;
};

export default Timeline;
