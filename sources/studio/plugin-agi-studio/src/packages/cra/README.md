# Plugin Host CRA Example

This example illustrates
- Creating a standalone application to run on CrafterCMS Plugin Host page
- Testing the components of a component library extension locally, without having to constantly deploy to CrafterCMS while you develop (see example-component-library project on this workspace)
- An example of standalone application with a dev and build toolchain

## Getting started

- Run `yarn` to install dependencies.
- Run `cp node_modules/@craftercms/studio-ui/shared-worker.js ./public` to enable running the CrafterCMS worker when using the webpack dev server for quick development.
- Run `yarn start` to start the dev server. View the app at `http://localhost:3000/studio`.
  - **Note**: you need to be running a CrafterCMS instance at `http://localhost:8080`.
- Run `yarn build` to build the app
- Deploy to CrafterCMS by creating a plugin using the `build/*` files with CATEGORY set to `apps`
  and NAME set to `example-cra` then install it via the `crafter-cli` command `copy-plugin`.
  - View the deployed app in CrafterCMS at `http://localhost:8080/studio/plugin?site=editorial-neue&pluginId=PLUGIN_ID&type=apps&name=example-cra&file=index.html`  where `PLUGIN_ID` is the plugin ID used in the plugin descriptor file
  - **Note**: this example assumes your project is called `editorial-neue`. If you have a different project name, please edit the `site` argument above and the `siteId` argument in the `PUBLIC_URL` on `.env.production`.

## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

To learn more on creating plugins in CrafterCMS, see [CrafterCMS plugins documentation](https://docs.craftercms.org/en/4.0/developers/extensions/plugins.html) 

