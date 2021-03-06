# BRAVADO QUEST

A simple profile search application [link](https://bravado-task.netlify.app/)

## Requirement

Node - v12.22.0

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

## Stack

- Nuxt.js - Vue Framework of choice.
- Scss - Styling (scoped)
- Vue Infinite Loading - Used to handling infinite scrolling
- Lodash Debounce - Used to debounce search input
- Google Fonts (Open Sans) - Font family of choice
- Eslint - Used for static code analysis
- Prettier - Used for code formatting
- UUID - Used for generating unique ids

## Features Covered

- Implemented search for users
- Added User card to display search results
- Debounced search input
- Implemented infinite scroll to optimize data fetching
- Clear Input button
- stateful search from (/search/'keyword')
- Mark/Skip selection (persisted to localstorage)

## Possible Improvements

- Cached results for frequently searched data
- Component Testing

## Links

[Deployed Here](https://bravado-task.netlify.app/)
