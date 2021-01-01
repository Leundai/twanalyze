# Twanalyze – Frontend

Twanalyze uses react-native-web for the frontend.

## Get up and running

### Install packages

To install the required packages, run `yarn`.

### Start options

To run twanalyze locally, start expo using `yarn start`. Alternatively, you can use one of the following to run a specific platform:

`yarn android`: Start the project in android-only mode.

`yarn ios`: Start the project in ios-only mode.

`yarn web`: Start the project in web-only mode.

## Build + Deploy Project

To deploy, first run `yarn build` (alternatively, `expo build:web`). This will create the static web files and place them in a directory named "web-build" in the "frontend" directory.

### Serving the site locally

Call `npx serve web-build` to serve the site locally.

### Deploying with Netlify

If you'd like to deploy with Netlify, first install the netlify-cli with `npm install netlify-cli -g`.

Then, make sure you're logged in with `netlify login`. Afterwards, you can setup your project or link the repository to an existing one with `netlify link`. You can then deploy the project in two ways:

1. `netlify deploy` -> Deploy the project as a preview and publish it manually
2. `yarn deploy` (alternatively, `netlify deploy --prod`) -> Deploy and publish the project immediately

## Deploy Project

To deploy, first run `expo build:web`. This will create the static web files and place them in a directory named "web-build" in the "frontend" directory.

Afterwards, call `npx serve web-build` to serve the site.

Note: You can use `yarn redeploy` to quickly build and deploy the site after making changes.
