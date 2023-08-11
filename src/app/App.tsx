import React, { Suspense, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { getUserIsInitiated, initAuthData } from '@/entities/User';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Navbar } from '@/widgets/Navbar';
import { PageLoader } from '@/widgets/PageLoader';
import { Sidebar } from '@/widgets/Sidebar';

import { useToolbar } from './lib/useToolbar';
import { AppRouter } from './providers/router';

function App() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const isInitiated = useSelector(getUserIsInitiated);

  const toolbar = useToolbar();

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!isInitiated) {
      dispatch(initAuthData());
    }
  }, [dispatch, isInitiated]);

  if (!isInitiated) {
    return (
      <ToggleFeatures
        featureName="isSiteRedesigned"
        on={
          <div id="app" className={classNames('app_redesigned', {}, [theme])}>
            <AppLoaderLayout />
          </div>
        }
        off={<PageLoader />}
      />
    );
  }

  const mods: Mods = {
    'content-bar_collapsed': collapsed,
  };

  return (
    <ToggleFeatures
      featureName="isSiteRedesigned"
      on={
        <div id="app" className={classNames('app_redesigned', {}, [theme])}>
          <Suspense fallback={<PageLoader />}>
            <MainLayout
              header={<Navbar />}
              content={<AppRouter />}
              sidebar={
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
              }
              toolbar={toolbar}
            />
          </Suspense>
        </div>
      }
      off={
        <div id="app" className={classNames('app', {}, [theme])}>
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
