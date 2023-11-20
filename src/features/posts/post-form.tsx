import { useState } from 'react';
import { styled } from 'styled-components';
import { Textarea } from '../ui';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { auth, db, storage } from '../../lib/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #1d9bf0;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.input`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;
const PostForm = () => {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    // 어떤 input은 복수의 파일을 업로드하게 해주기때문에 input이 변경될 때마다 배열형태로 받게 된다.
    // 하나의 파일이 있을 때 경우 체크
    const MAX_SIZE = 3 * 1024 * 1024; //3MB

    if (files && files.length === 1) {
      if (files[0].size <= MAX_SIZE) {
        setFile(files[0]);
      } else {
        alert('File size must be 3MB or less.');
        return;
      }
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || tweet === '' || tweet.length > 180) return;
    try {
      setLoading(true);
      // 새로운 document 생성
      const doc = await addDoc(collection(db, 'tweets'), {
        tweet,
        createdAt: Date.now(),
        userName: user.displayName || 'Anonymous',
        userId: user.uid,
      });

      //이미지 첨부한 경우 생성한 경로에 저장
      if (file) {
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
        const uploadResult = await uploadBytes(locationRef, file);
        const imgUrl = await getDownloadURL(uploadResult.ref);
        await updateDoc(doc, { photo: imgUrl });
      }
      setTweet('');  
      setFile(null);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <Textarea
        required={true}
        rows={8}
        maxLength={180}
        onChange={onChange}
        value={tweet}
        placeholder="What is happening?!"
      />
      <AttachFileButton htmlFor="file">
        {file ? 'Photo added ✅' : 'Add photo'}
      </AttachFileButton>
      <AttachFileInput
        onChange={onFileChange}
        type="file"
        id="file"
        accept="image/*"
      />
      <SubmitBtn
        type="submit"
        value={isLoading ? 'Posting...' : 'Post tweet'}
      />
    </Form>
  );
};

export default PostForm;
