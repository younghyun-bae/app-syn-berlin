import 'dotenv/config';

export default {
  "expo": {
    "name": "SYN",
    "slug": "app-syn-berlin",
    "scheme": ["app-syn-berlin"],
    "facebookScheme": "fb1038031424464248",
    "facebookDisplayName": "SYN",
    "facebookAppId": 1038031424464248,
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "platforms": [
      "ios",
      "android"
    ],
    "ios": {
      "bundleIdentifier": "com.bae.syn",
      "googleServicesFile": "./GoogleService-Info.plist",
      "supportsTablet": true
    },
    "android": {
      "package": "com.bae.syn",
      "googleServicesFile": "google-services.json",
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png",
      "bundler": "metro"
    },
    "plugins": [
      "expo-router",
      "expo-font",
      "@react-native-google-signin/google-signin"
    ],
    "extra": {
      "eas": {
        "projectId": "39f2ec3e-fb32-4ce8-9cb8-d2cb8dae4a7b"
      }
    }
  }
}
