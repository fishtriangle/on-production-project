import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import AboutIconDeprecated from '@/shared/assets/icons/about.svg';
import ArticlesIconDeprecated from '@/shared/assets/icons/articles.svg';
import HomeIconDeprecated from '@/shared/assets/icons/home.svg';
import ArticleIcon from '@/shared/assets/icons/import/article.svg';
import ProfileIcon from '@/shared/assets/icons/import/avatar.svg';
import MainIcon from '@/shared/assets/icons/import/home.svg';
import AboutIcon from '@/shared/assets/icons/import/Info.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/profile.svg';
import {
  getRouteAbout,
  getRouteArticles,
  getRouteMain,
  getRouteProfile,
} from '@/shared/const/router';
import { toggleFeatures } from '@/shared/lib/features';

import { SidebarItemType } from '../types/sidebar';

export const useSidebarItems = () => {
  const userData = useSelector(getUserAuthData);
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: getRouteMain(),
      text: 'Main page',
      Icon: toggleFeatures({
        name: 'isSiteRedesigned',
        off: () => HomeIconDeprecated,
        on: () => MainIcon,
      }),
    },
    {
      path: getRouteAbout(),
      text: 'About page',
      Icon: toggleFeatures({
        name: 'isSiteRedesigned',
        off: () => AboutIconDeprecated,
        on: () => AboutIcon,
      }),
    },
  ];

  if (userData) {
    sidebarItemsList.push(
      {
        path: getRouteProfile(userData.id),
        text: 'Profile page',
        Icon: toggleFeatures({
          name: 'isSiteRedesigned',
          off: () => ProfileIconDeprecated,
          on: () => ProfileIcon,
        }),

        authOnly: true,
      },
      {
        path: getRouteArticles(),
        text: 'Articles page',
        Icon: toggleFeatures({
          name: 'isSiteRedesigned',
          off: () => ArticlesIconDeprecated,
          on: () => ArticleIcon,
        }),

        authOnly: true,
      },
    );
  }
  return sidebarItemsList;
};
