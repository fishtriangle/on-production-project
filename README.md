[![Netlify Status](https://api.netlify.com/api/v1/badges/07cdd517-c49e-4431-93eb-8130863552d3/deploy-status)](https://app.netlify.com/sites/neon-mochi-af316f/deploys)

# React-production
Project that testing react possibilities, optimization methods and different js-libraries.

## Requirements
<ul>
<li>Node.js</li>
</ul>

----

## Installation
To install environment:
```
npm i
```
To start project with webpack in dev mode:
```
npm run start:dev
```

To start project with vite in dev mode:
```
npm run start:dev:vite
```

----

## Scripts:
 - `npm run start` - launch frontend in dev mode with webpack
 - `npm run start:vite` - launch frontend in dev mode with vite
 - `npm run start:dev` - launch frontend and backend in dev mode with webpack
 - `npm run start:dev:vite` - launch frontend and backend in dev mode with vite
 - `npm run start:dev:server` - launch backend server
 - `npm run build:prod` - start assembling of production build
 - `npm run build:dev` - start assembling of development build
 - `npm run lint:ts` - start eslint check of the typescript files
 - `npm run lint:ts:fix` - start eslint check of the typescript files and fix errors
 - `npm run lint:scss` - start stylelint check of scss files
 - `npm run lint:scss:fix` - start stylelint check of scss files and fix errors
 - `npm run test:unit` - start unit tests with jest
 - `npm run test:ui` - start screenshot tests with loki and storybook
 - `npm run test:ui:update` - add new reference screenshots
 - `npm run test:ui:ci` - start screenshot tests in CI mode
 - `npm run test:ui:report` - make html report of the screenshot tests errors
 - `npm run test:ui:json` - make json report of the screenshot tests errors
 - `npm run test:ui:html` - make html report of the screenshot tests errors from json report
 - `npm run storybook` - launch storybook
 - `npm run storybook:build` - start assembling storybook build
 - `npm run prepare` - start precommit hooks with husky
 - `npm run generate:slice <layer> <sliceName>` - generate FSD slice

----

## Architecture
Feature sliced design is used in the project.
[Link for the documentation](https://feature-sliced.design)

----

## Localization options
To handle with different translations i18next library is used. Translation files stored at public/locales.
[Link for the i18next documentation](https://react.i18next.com)

----

## Testing
Tests that are used in the project:
- `npm run test:unit` - unit tests with jest and React testing library
- `npm run test:ui` - screenshot tests with loki and storybook

About tests - [Documentation](/docs/tests.md)

----

## Linting
Linting in project represented with eslint for typescript and stylelint for scss.

To control FSD rules custom *eslint-plugin-fish-triangle-eslint-plugin* is installed.
It contains 3 rules:
- dependency-path-checker - forbid absolute import inside same module
- layer-imports - check layers delegation
- public-api-imports - check absolute imports for importing from public API

### Linting scripts
- `npm run lint:ts` - start eslint check of the typescript files
- `npm run lint:ts:fix` - start eslint check of the typescript files and fix errors
- `npm run lint:scss` - start stylelint check of scss files
- `npm run lint:scss:fix` - start stylelint check of scss files and fix errors

----

## Storybook
For most ui components there are Storybook cases(stories).
Server requests are mocked with *storybook-addon-mock*.
Story files(.stories.tsx) are located same folder with ui tsx file. 
- `npm run storybook` - launch storybook

About [Storybook](/docs/storybook.md).

Example of story:
```typescript jsx
import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CountrySelect } from './CountrySelect';

export default {
  title: 'entities/CountrySelect',
  component: CountrySelect,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
    children: 'CurrencySelect',
  },
} as ComponentMeta<typeof CountrySelect>;

const Template: ComponentStory<typeof CountrySelect> = (args) => <CountrySelect {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
```

----

## Project configs
There are 2 build configs for the project:
1. Webpack: ./webpack.config.ts and ./config/build
2. Vite: ./vite.config.ts

Main config settings are at ./config:
- /config/babel - babel
- /config/build - webpack
- /config/jest - for jest tests
- /config/storybook - storybook

----

## Scripts
At scripts folder there are several scripts for code refactoring and generation reports.
1. Create slice - generate FSD slice.
2. Generate visual json report - make html report of the screenshot tests errors from json report.
3. Create public API for shared/ui.
4. Update imports - add @ alias for absolute imports.

----

## CI pipeline and precommit hooks
GitHub actions config is at ./.github/workflows. There are actions for linting, testing, build storybook.

Additional precommit hooks are made with husky and its config is ./.husky

----

## State manager
The state manager for the project is Redux toolkit. Entities should be normalized with EntityAdapter.

Server requests are made with [RTK query](/src/shared/api/rtkApi.ts).

Also, there is async reducers attaching - [DynamicModuleLoader](/src/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader.tsx)

----

## FSD

### Entities
- [Article](./src/entities/Article/README.md)
- [Comment](./src/entities/Comment/README.md)
- [Counter](./src/entities/Counter/README.md)
- [Country](./src/entities/Country/README.md)
- [Currency](./src/entities/Currency/README.md)
- [Notification](./src/entities/Notification/README.md)
- [Profile](./src/entities/Profile/README.md)
- [Rating](./src/entities/Rating/README.md)
- [User](./src/entities/User/README.md)

### Features
- [AddNewComment](./src/features/AddNewComment/README.md)
- [ArticleRating](./src/features/ArticleRating/README.md)
- [ArticleRecommendationsList](./src/features/ArticleRecommendationsList/README.md)
- [AuthByUsername](./src/features/AuthByUsername/README.md)
- [AvatarDropdown](./src/features/AvatarDropdown/README.md)
- [EditableProfileCard](./src/features/EditableProfileCard/README.md)
- [LanguageSwitcher](./src/features/LanguageSwitcher/README.md)
- [NotificationsButton](./src/features/NotificationsButton/README.md)
- [ProfileRating](./src/features/ProfileRating/README.md)
- [ThemeSwitcher](./src/features/ThemeSwitcher/README.md)
