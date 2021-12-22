# BRAVADO QUEST

A simple profile search application

## Stack

- Nuxt.js - Vue Framework of choice.
- Scss - Styling (scoped)
- Vue Infinite Loading - Used to handling infinite scrolling
- Lodash Debounce - Used to debounce search input
- Google Fonts (Open Sans) - Font family of choice
- Eslint - Used for static code analysis
- Prettier - Used for code formatting

## Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn nuxt

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## Features Covered

- Search for users and display each user on a card
- Debounced search input
- Implemented infinite scroll to optimize data fetching
- Clear Input button
- stateful search from (/search/'keyword')

## Possible Improvements

- Cached results for frequently searched data
- Component Testing
