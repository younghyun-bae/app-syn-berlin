export default {
  "expo": {
    "name": "SYN",
    "slug": "app-syn-berlin",
    "scheme": "app-syn-berlin",
    "facebookScheme": "fb1038031424464248",
    "facebookDisplayName": "SYN",
    "facebookAppId": "1038031424464248",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "jsEngine": "jsc",
    "platforms": [
      "ios",
      "android"
    ],
    "ios": {
      "bundleIdentifier": "com.bae.syn",
      "googleServicesFile": "./GoogleService-Info.plist",
      "supportsTablet": true,
      "infoPlist": {
        "NSCameraUsageDescription": "This app requires camera access.",
        "NSPhotoLibraryUsageDescription": "This app requires photo library access."
      }
    },
    "android": {
      "package": "com.bae.syn",
      "googleServicesFile": process.env.GOOGLE_SERVICES_FILE_ANDROID,
      "intentFilters": [
        {
          "action": "VIEW",
          "autoVerify": true,
          "data": [
            {
              "scheme": "fb1038031424464248",
              "host": "authorize"
            }
          ],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ],
      "permissions": [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "READ_MEDIA_IMAGES",
        "INTERNET"
      ],
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
      "@react-native-google-signin/google-signin",
      "react-native-fbsdk-next",
      "expo-image-picker",
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location."
        }
      ],
    ],
    "extra": {
      "eas": {
        "projectId": "39f2ec3e-fb32-4ce8-9cb8-d2cb8dae4a7b"
      }
    }
  }
}
