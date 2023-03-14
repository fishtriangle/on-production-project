import React, { Suspense, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { PageLoader } from 'widgets/PageLoader';
import { useDispatch, useSelector } from 'react-redux';
import { getUserIsInitiated, userActions } from 'entities/User';

function App() {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const isInitiated = useSelector(getUserIsInitiated);

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback={<PageLoader />}>
        <Navbar />
        <div className="content-page">
          <Sidebar />
          {isInitiated && <AppRouter />}
        </div>
      </Suspense>
    </div>
  );
}

export default App;
