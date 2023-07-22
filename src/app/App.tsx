import React, { Suspense, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { getUserIsInitiated, initAuthData } from '@/entities/User';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Navbar } from '@/widgets/Navbar';
import { PageLoader } from '@/widgets/PageLoader';
import { Sidebar } from '@/widgets/Sidebar';

import { AppRouter } from './providers/router';

function App() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const isInitiated = useSelector(getUserIsInitiated);

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    dispatch(initAuthData());
  }, [dispatch]);

  if (!isInitiated) {
    return <PageLoader />;
  }

  const mods: Mods = {
    'content-bar_collapsed': collapsed,
  };

  return (
    <ToggleFeatures
      featureName="isSiteRedesigned"
      on={
        <div className={classNames('app_redesigned', {}, [theme])}>
          <Suspense fallback={<PageLoader />}>
            <MainLayout
              header={<Navbar />}
              content={<AppRouter />}
              sidebar={
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
              }
              // toolbar={<div>sdjfhbvskjhb</div>}
            />
          </Suspense>
        </div>
      }
      off={
        <div className={classNames('app', {}, [theme])}>
          <Suspense fallback={<PageLoader />}>
            <Navbar />
            <div className="content-page">
              <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
              <div className={classNames('content-bar', mods)}>
                <AppRouter />
              </div>
            </div>
          </Suspense>
        </div>
      }
    />
  );
}

export default App;
