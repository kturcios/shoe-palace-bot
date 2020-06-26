# Shoe Palace Bot
This Electron project is bootstrapped with create-react-app.

It has also been configured with some additional tools and features:
- eslint (configured with Airbnb code style)
- shared codebase (/src/shared) - accessible by both Electron and React files
- auto-update

## Start
To start the project in development mode: `$ npm run start-electron`

## Create a distributable (dmg)
This boilerplate is only configured to create a distributable for Mac at the moment.

Create a distributable: `$ npm run dist`

## Auto-update
Builds are published to S3 and require some additional configuration to set it up.
- AWS-CLI with valid permissions to read and write to the specified bucket
- Apple Certificate to codesign the application
- Apple Developer credentials to notarize the application (loaded via APPLEID and APPLEIDPASS environment variables)

If you wish to publish to S3 every time a distributable to created, change `--publish never` to `--publish always` in `package.json`
