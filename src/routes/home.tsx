import { styled } from 'styled-components';
import { PostForm, Timeline } from '../features/posts';

export const HomeWrapper = styled.div`
  display: grid;
  gap: 50px;
  overflow-y: scroll;
  grid-template-rows: 1fr 5fr;
`;

const home = () => {
  return (
    <HomeWrapper>
      <PostForm />
      <Timeline />
    </HomeWrapper>
  );
};

export default home;
