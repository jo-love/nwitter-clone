import {
  Unsubscribe,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import TweetCard from './tweet-card';
import { styled } from 'styled-components';

export interface ITweet {
  id: string;
  photo?: string;
  tweet: string;
  userId: string;
  userName: string;
  createdAt: number;
}

const TimeLineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: scroll;
`;

const Timeline = () => {
  const [tweets, setTweets] = useState<ITweet[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;

    const fetchTweets = async () => {
      const tweetsQuery = query(
        collection(db, 'tweets'),
        orderBy('createdAt', 'desc'),
        limit(25),
      );
      // const snapshot = await getDocs(tweetsQuery);
      // const tweets = snapshot.docs.map((doc) => {
      //   const { tweet, createdAt, userId, userName, photo } = doc.data();
      //   return { tweet, createdAt, userId, userName, photo, id: doc.id };
      // });

      // realtime 함수
      unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          const { tweet, createdAt, userId, userName, photo } = doc.data();
          return { tweet, createdAt, userId, userName, photo, id: doc.id };
        });
        setTweets(tweets);
      });
    };
    fetchTweets();
    // 현재 이 컴포넌트가 안보인다면 cleanup 실시
    return () => {
      // unsubscribe가 null이 아니면 호출
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <TimeLineWrapper>
      {tweets.map((card) => (
        <TweetCard key={card.id} {...card} />
      ))}
    </TimeLineWrapper>
  );
};

export default Timeline;
