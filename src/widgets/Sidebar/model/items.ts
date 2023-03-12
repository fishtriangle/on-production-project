import React from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/about.svg';
import HomeIcon from 'shared/assets/icons/home.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';

export interface SidebarItemType {
  path: string;
  text: string;
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>
  authOnly?: boolean;
}

export const SidebarItemsList: SidebarItemType[] = [
  {
    path: RoutePath.main,
    text: 'Main page',
    Icon: HomeIcon,
  },
  {
    path: RoutePath.about,
    text: 'About page',
    Icon: AboutIcon,
  },
  {
    path: RoutePath.profile,
    text: 'Profile page',
    Icon: ProfileIcon,
    authOnly: true,
  },
];
