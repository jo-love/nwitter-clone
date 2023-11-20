import { styled } from 'styled-components';
import { ITweet } from './timeline';
import { auth, db, storage } from '../../lib/firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import Button from '../ui/button';
import { useState } from 'react';
import { Textarea } from '../ui';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column = styled.div``;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  padding: 20px;
  font-size: 16px;
  line-height: 1.1;
`;

const BtnWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const TweetCard = ({ userName, tweet, photo, userId, id }: ITweet) => {
  const user = auth.currentUser;
  const [isEditing, setEditing] = useState(false);
  const [content, setContent] = useState(tweet);

  const onDelete = async () => {
    const doubleCheck = confirm('Are you sure you want to delete this tweet?');
    if (!doubleCheck || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, '/tweets', id));
      // 사진저장소가 같이 삭제
      if (photo) {
        const photoRef = ref(storage, `tweets/${user?.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onEdit = async () => {
    setEditing((prev) => !prev);
    if (!isEditing) return;
    try {
      await updateDoc(doc(db, '/tweets', id), {
        tweet: content,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setEditing(false);
    }
  };
  console.log('edit', isEditing);
  return (
    <Wrapper>
      <Column>
        <Username>{userName}</Username>
        {isEditing ? (
          <Textarea
            rows={8}
            maxLength={180}
            onChange={(e) => setContent(e.target.value)}
            value={content}
            border="none"
          />
        ) : (
          <Payload>{tweet}</Payload>
        )}
        {user?.uid === userId ? (
          <BtnWrapper>
            <Button text="delete" bg="tomato" onClick={onDelete} />
            <Button
              text={isEditing ? 'save' : 'edit'}
              bg="#333333"
              onClick={onEdit}
            />
          </BtnWrapper>
        ) : null}
      </Column>
      {photo ? (
        <Column>
          <Photo src={photo} />
        </Column>
      ) : null}
    </Wrapper>
  );
};

export default TweetCard;
