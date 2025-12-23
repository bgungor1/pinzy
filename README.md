# Social Media Mobile App

Welcome to the Social Media Mobile App project! This application allows users to share posts and mark favorite locations on a map, providing a rich social experience.

## Table of Contents

- [Social Media Mobile App](#social-media-mobile-app)
  - [Table of Contents](#table-of-contents)
  - [Turkish Versiyon](#turkish-versiyon)
  - [Project Overview](#project-overview)
  - [Features](#features)
  - [Backend Setup](#backend-setup)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Testing Backend Endpoints](#testing-backend-endpoints)
  - [Mobile App Setup](#mobile-app-setup)
    - [Prerequisites](#prerequisites-1)
    - [Installation](#installation-1)
    - [Running the App](#running-the-app)
  - [Project Structure](#project-structure)
  - [Authentication](#authentication)
    - [JWT Token Integration](#jwt-token-integration)
      - [Secure Token Storage (`utils/use-secure-value.ts`)](#secure-token-storage-utilsuse-secure-valuets)
  - [Posts Module](#posts-module)
  - [Map Pins Module](#map-pins-module)
  - [UI/UX Design](#uiux-design)
  - [Contributing](#contributing)
  - [License](#license)

## Turkish Versiyon

[Türkçe Versiyon için buraya tıklayın](README.tr.md)

## Project Overview

This project aims to build a social media application with the following core functionalities:
*   User authentication (Login, Register)
*   Post sharing
*   Marking favorite locations on a map
*   User profiles
*   Interactive UI with Drawer Navigation

## Features

*   **Authentication:** Secure user registration and login with JWT tokens.
*   **Post Management:** Create, read, update, and delete posts. Display all posts, user's own posts, and filtered posts by other users.
*   **Map Integration:** View and add map pins with titles and descriptions. Filter pins by all users, current user, or specific user IDs. Interactive bottom sheet for pin listing and navigation.
*   **User Profile:** View user information and manage their posts.
*   **Navigation:** Intuitive Drawer Navigator for seamless screen transitions.

## Backend Setup

This project utilizes a separate backend API. You will need to set up and run the backend project first.

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or Yarn

### Installation

1.  **Navigate to the backend project directory:**
    Assume your backend project is located in a directory next to your mobile project.
    `cd ../your-backend-project-folder`

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the backend server:**
    ```bash
    npm start
    # or
    yarn start
    ```
    The backend server should now be running, typically on `http://localhost:3000` (or as specified in its `README.md`).

### Testing Backend Endpoints

Before proceeding with the mobile app, ensure the backend is working correctly by testing some API endpoints. You can use tools like Postman, Insomnia, or a simple `curl` command. Refer to the backend project's `README.md` for available endpoints.

## Mobile App Setup

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or Yarn
*   Expo CLI (`npm install -g expo-cli`)
*   A physical device or emulator/simulator for testing.

### Installation

1.  **Navigate to the mobile app project directory:**
    `cd MA-8156` (assuming this is your project folder)

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Install `react-native-keychain`:**
    ```bash
    expo install react-native-keychain
    ```
    This package is essential for securely storing JWT tokens.

4.  **Install `react-native-maps`:**
    ```bash
    expo install react-native-maps
    ```
    This package is required for map functionalities.

### Running the App

To start the Expo development server:

```bash
expo start
```

This will open a new tab in your browser with the Expo Developer Tools. You can then:
*   Scan the QR code with your Expo Go app on a physical device.
*   Run on an Android emulator.
*   Run on an iOS simulator (macOS only).

## Project Structure

The project follows a modular and feature-centric directory structure for better organization and scalability.

```
.
├── src/
│   ├── assets/             // Images, fonts, icons
│   ├── components/         // Reusable UI components (common, auth, posts, map)
│   ├── navigation/         // React Navigation setup
│   ├── screens/            // Main screens/pages of the app
│   ├── services/           // API service calls
│   ├── contexts/           // React Context API for global state
│   ├── hooks/              // Custom React Hooks
│   ├── utils/              // Utility functions, constants, secure storage
│   ├── themes/             // Styling (colors, typography)
│   ├── App.tsx             // Main application component
│   └── index.ts            // Entry point
└── ... (other config files)
```

## Authentication

The application features a robust authentication system:

*   **Login & Register:** Connects to the backend API for user authentication.
*   **JWT Token Integration:** Handles `access_token` and `refresh_token` for secure API communication.
*   **Secure Token Storage:** Utilizes `react-native-keychain` for safely storing JWT tokens.

### JWT Token Integration

The JWT tokens (access and refresh tokens) received from the backend API during login/register will be securely stored using `react-native-keychain`.

#### Secure Token Storage (`utils/use-secure-value.ts`)

You will implement a custom hook/utility in `src/utils/use-secure-value.ts` based on the provided example to handle secure storage operations:

```typescript
// src/utils/use-secure-value.ts
// ... (content based on the provided GitHub Gist for react-native-keychain)

// Example usage after backend response:
// await setSecureValue("jwt-at", "YOUR_ACCESS_TOKEN_HERE");
// await setSecureValue("jwt-rt", "YOUR_REFRESH_TOKEN_HERE");

// Example usage to retrieve tokens:
// const accessToken = await getSecureValue("jwt-at");
// const refreshToken = await getSecureValue("jwt-rt");

// Example usage for logout:
// await removeSecureValue("jwt-at");
// await removeSecureValue("jwt-rt");
```

## Posts Module

The Posts module offers full CRUD (Create, Read, Update, Delete) functionality for user posts, integrated with the backend API.

*   **List All Posts:** Displays all posts from the system.
*   **Create Post:** A Floating Action Button (FAB) on the "All Posts" screen will navigate to a post creation screen.
*   **List User's Own Posts:** Accessible from the Profile screen, this lists posts belonging to the currently logged-in user (filtered by `userId` query string).
*   **List Another User's Posts:** Accessible via a filter on the "All Posts" screen, allowing filtering by a specific `userId` query string.
*   **Edit Post:** A dedicated screen for modifying existing posts.
*   **Authorization:** Frontend authorization checks will ensure that users can only edit or delete their own posts.

## Map Pins Module

This module integrates map functionalities using `react-native-maps` to allow users to interact with locations.

*   **Map Display:** A map screen accessible via the Drawer Navigator displays all map pins.
*   **Add Map Pin:** Tapping anywhere on the map opens a dialog for entering a title and description. Saving creates a new pin with the tapped coordinates.
*   **Display Pins:** All users' pins are visible. The currently logged-in user's pins are displayed in a different color.
*   **Pin Details & Edit:** Tapping a pin opens a dialog showing its title and description. If the pin belongs to the current user or an admin, it's editable and a delete option is available.
*   **Bottom Sheet:** A bottom sheet lists all map pins. Tapping a list item centers the map on that pin. Swiping a list item reveals an edit button.
*   **Pin Filtering:**
    *   Filter options: "All Pins", "My Pins".
    *   A third option: "Other User..." which opens a dialog to enter a `userId` to filter pins. The filtered `userId` is displayed.

## UI/UX Design

The application emphasizes a clean and intuitive user interface:

*   **Login & Register Screens:** Designed based on a chosen modern UI concept.
*   **Drawer Navigator:** Provides easy access to core features like "Welcome Screen", "Posts", "Map", and "Profile".
*   **Floating Action Button (FAB):** For quick post creation.
*   **Dialogs & Bottom Sheets:** For interactive elements like adding/editing pins and filtering.
*   **SafeArea & KeyboardAvoidingView:** Proper handling of screen safe areas and keyboard interactions for a smooth user experience.

## Contributing

Contributions are welcome! Please follow these steps:
1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'feat: Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
