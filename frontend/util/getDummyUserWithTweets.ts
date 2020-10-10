import { User } from '../models/Tweet';

export const getDummyUserWithTweets = (): User => ({
  name: 'Donald Trump',
  username: 'realDonaldTrump',
  profile_picture:
    'https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_400x400.jpg',
  tweets: [
    {
      text:
        'The Great Commonwealth of Pennsylvania would absolutely die without the jobs and dollars brought in by Fracking. Massive numbers! Now Biden & Harris, after Radical Left Dem Primaries, are trying to change their stance. Pennsylvania wants Energy and Second Amendment!',
      likes: 50300,
      retweets: 13300,
      time_created: '2020-10-08T11:11:37Z', // Might be the incorrect type and may change - date is formatted "2020-10-07T17:09:37Z"
      sentiment: {
        score: 'Negative',
        confidence: 0.65,
      },
      replies: [],
    },
    {
      text:
        'The Great Commonwealth of Pennsylvania would absolutely die without the jobs and dollars brought in by Fracking. Massive numbers! Now Biden & Harris, after Radical Left Dem Primaries, are trying to change their stance. Pennsylvania wants Energy and Second Amendment!',
      likes: 50300,
      retweets: 13300,
      time_created: '2020-10-08T11:11:37Z', // Might be the incorrect type and may change - date is formatted "2020-10-07T17:09:37Z"
      sentiment: {
        score: 'Positive',
        confidence: 0.35,
      },
      replies: [],
    },
    {
      text:
        'The Great Commonwealth of Pennsylvania would absolutely die without the jobs and dollars brought in by Fracking. Massive numbers! Now Biden & Harris, after Radical Left Dem Primaries, are trying to change their stance. Pennsylvania wants Energy and Second Amendment!',
      likes: 50300,
      retweets: 13300,
      time_created: '2020-10-08T11:11:37Z', // Might be the incorrect type and may change - date is formatted "2020-10-07T17:09:37Z"
      sentiment: {
        score: 'Positive',
        confidence: 0.8,
      },
      replies: [],
    },
    {
      text:
        'The Great Commonwealth of Pennsylvania would absolutely die without the jobs and dollars brought in by Fracking. Massive numbers! Now Biden & Harris, after Radical Left Dem Primaries, are trying to change their stance. Pennsylvania wants Energy and Second Amendment!',
      likes: 50300,
      retweets: 13300,
      time_created: '2020-10-08T11:11:37Z', // Might be the incorrect type and may change - date is formatted "2020-10-07T17:09:37Z"
      sentiment: {
        score: 'Neutral',
        confidence: 0.6,
      },
      replies: [],
    },
    {
      text:
        'The Great Commonwealth of Pennsylvania would absolutely die without the jobs and dollars brought in by Fracking. Massive numbers! Now Biden & Harris, after Radical Left Dem Primaries, are trying to change their stance. Pennsylvania wants Energy and Second Amendment!',
      likes: 50300,
      retweets: 13300,
      time_created: '2020-10-08T11:11:37Z', // Might be the incorrect type and may change - date is formatted "2020-10-07T17:09:37Z"
      sentiment: {
        score: 'Mixed',
        confidence: 0.3,
      },
      replies: [],
    },
    {
      text:
        'The Great Commonwealth of Pennsylvania would absolutely die without the jobs and dollars brought in by Fracking. Massive numbers! Now Biden & Harris, after Radical Left Dem Primaries, are trying to change their stance. Pennsylvania wants Energy and Second Amendment!',
      likes: 50300,
      retweets: 13300,
      time_created: '2020-10-08T11:11:37Z', // Might be the incorrect type and may change - date is formatted "2020-10-07T17:09:37Z"
      sentiment: {
        score: 'Mixed',
        confidence: 0.1,
      },
      replies: [],
    },
    {
      text:
        'The Great Commonwealth of Pennsylvania would absolutely die without the jobs and dollars brought in by Fracking. Massive numbers! Now Biden & Harris, after Radical Left Dem Primaries, are trying to change their stance. Pennsylvania wants Energy and Second Amendment!',
      likes: 50300,
      retweets: 13300,
      time_created: '2020-10-08T11:11:37Z', // Might be the incorrect type and may change - date is formatted "2020-10-07T17:09:37Z"
      sentiment: {
        score: 'Negative',
        confidence: 1,
      },
      replies: [],
    },
  ],
});
