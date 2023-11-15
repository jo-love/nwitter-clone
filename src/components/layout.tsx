import { Outlet } from 'react-router-dom';

const layout = () => {
  return (
    <>
      <h2>layout</h2>
      <Outlet />
    </>
  );
};

export default layout;
