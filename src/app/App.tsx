import React, { Suspense, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { getUserIsInitiated, userActions } from '@/entities/User';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Navbar } from '@/widgets/Navbar';
import { PageLoader } from '@/widgets/PageLoader';
import { Sidebar } from '@/widgets/Sidebar';

import { AppRouter } from './providers/router';

function App() {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const isInitiated = useSelector(getUserIsInitiated);

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  const mods: Mods = {
    'content-bar_collapsed': collapsed,
  };

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback={<PageLoader />}>
        <Navbar />
        <div className="content-page">
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
          <div className={classNames('content-bar', mods)}>
            {isInitiated && <AppRouter />}
          </div>
        </div>
      </Suspense>
    </div>
  );
}

export default App;
