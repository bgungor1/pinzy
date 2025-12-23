import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config,
    name: "my-expo-app",
    slug: "my-expo-app",
    version: "1.0.0",
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      EXPO_PUBLIC_API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL,
      eas: {
        projectId: "deb0e450-65b9-4925-9ae5-20d4af59d98d"
      }
    },
    experiments: {
      tsconfigPaths: true
    },
    plugins: [
      "expo-secure-store",
      [
        "expo-camera",
        {
          "cameraPermission": "Fotoğraf ve video çekmek için kamera erişimi gerekli.",
          "microphonePermission": "Video kaydetmek için mikrofon erişimi gerekli.",
          "recordAudioAndroid": true
        }
      ],
      [
        "expo-audio",
        {
          "microphonePermission": "Ses kaydı yapmak için mikrofon erişimi gerekli."
        }
      ]
    ],
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
      },
      package: "com.ojs.pinzy",
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      },
    },
  };
};
