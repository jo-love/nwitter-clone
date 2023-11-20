import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './features/layout';
import Home from './routes/home';
import Profile from './routes/profile';
import Login from './routes/login';
import SignUp from './routes/sign-up';
import { GlobalStyles } from './styles/globalStyle';
import { useEffect, useState } from 'react';
import LoadingScreen from './features/ui/loading-screen';
import { auth } from './lib/firebase';
import ProtectedRoute from './features/protected-route';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
  { path: 'login', element: <Login /> },
  { path: 'signup', element: <SignUp /> },
]);

function App() {
  const [isLoading, setLoading] = useState(true);

  const init = async () => {
    await auth.authStateReady();
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </>
  );
}

export default App;
