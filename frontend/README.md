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

## Deploy Project

To deploy, first run `expo build:web`. This will create the static web files and place them in a directory named "web-build" in the "frontend" directory.

Afterwards, call `npx serve web-build` to serve the site.
