# hack :avocado:

Hack Day Team 1 Repository

## Design Context - Safety :shield:

Brief:  
To use data provided from the following sources to create an app

### Data Resources :chart:

> - **[Police Data / API](https://data.police.uk/docs/)**
> - **[GOV Open Data](https://data.gov.uk/)**

# Getting started

## Prerequisites

- node
- Expo CLI command line utility:

```js
npm install -g expo-cli
```

## Install the project

1. Clone the project:

```js
git clone https://github.com/NickBurness/hack-avocado.git
```

2. Install node modules. Navigate to `./hack-avocado`:

```js
npm install
```

3. Firebase is used in this app, you will need to provide your a Firebase configuration object. Add a file called `secrets.json` to `./hack-avocado/src/firebase/` with the following format:

```js
{
  "apiKey": "<YOUR_API_KEY>",
  "authDomain": "<YOUR_AUTH_DOMAIN>",
  "projectId": "<YOUR_PROJECT_ID>"
}
```

## Run the application on a device

1. Install the Expo client app on your [iOS](https://apps.apple.com/gb/app/expo-client/id982107779) or [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_GB) device and connect to the same wireless network as your computer.

2. Start the development server. Navigate to `./hack-avocado`:

```js
npm start
```

3. Run the application.
   On Android, use the Expo app to scan the QR code from your terminal to open your project.
   On iOS, scan the QR code with your camera app, you will be prompted to open the Expo Client.

## Run the application on an emulator

If you have Android Studio or Xcode and the respective emulators/simulators installed the app can be opened in these. See detailed instructions for [iOS](https://docs.expo.io/workflow/ios-simulator/) and [Android](https://docs.expo.io/workflow/android-studio-emulator/).

For Android:

```js
npm run android
```

For iOS:

```js
npm run ios
```
