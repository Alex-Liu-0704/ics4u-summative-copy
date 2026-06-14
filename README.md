[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/YGzIhooR)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=23987076)
# 🟪 Summative - Firebase

## 🎯 Purpose

- Manage global state using React Context
- Build and organize feature-based views
- Implement cart and favorites functionality
- Work with date-based calculations for dynamic pricing
- Persist user data in local storage across browser sessions
- Structure a scalable front-end application using components, hooks and utilities

## 📦 Project Structure

The starter code contains the following:

- 🚫 `/.devcontainer`
- 🔎 `/docs`
- 🛠️ `/src/components`
- 🛠️ `/src/context`
- 🛠️ `/src/firebase`
- 🛠️ `/src/core`
- 🚫 `/src/hooks`
- 🛠️ `/src/layouts`
- 🛠️ `/src/views`
- 🛠️ `/src/App.tsx`
- 🚫 `/src/index.css`
- 🚫 `/src/main.tsx`
- 🚫 `/.gitignore`
- 🚫 `/biome.json`
- 🔎 `/cspell.json`
- 🚫 `/index.html`
- 🚫 `/package.json`
- 🔎 `/README.md`
- 🚫 `/tsconfig.app.json`
- 🚫 `/tsconfig.json`
- 🚫 `/tsconfig.node.json`
- 🚫 `/vite.config.json`

**Legend:**

- 🔎 = content should be viewed
- 🛠️ = content requires modification
- 🚫 = content must **not** be edited

## 🧪 Demo

A working [demo](https://ics4u-d2784-summative.firebaseapp.com/) has been provided

## ☑️ Task

1. Create a `.env` file in the root folder of this project and add your TMDB API key to the `VITE_TMDB_API_KEY` environment variable
2. Paste your firebaseConfig data from Firebase Console into the firebase `index.js` file
3. Migrate Assignment 5 code to this starter project
4. Create a SignInView that allows users to register or login by email and/or Google OAuth
5. **Only** The following information should be saved on local storage:
   - Favorites
   - Cart
6. The following information **must** be saved on Firestore:
   - Genre Preferences
   - Purchases
7. Users should be able to view the following options in SettingsView:
   - Display name (updates user's Google Auth profile)
   - Avatar (updates user's Google Auth profile)
   - Password (only available for users logged in via email)
   - Genre preferences (saves to Firestore when the Save button is pressed)
   - Purchases (shows past purchases)
8. When the user presses the Purchase button in CartView:
   - They should see the `Dialog` component to confirm or reject their purchase
   - If the purchase is confirmed, they should be redirected to SuccessView
9. Implement a route guard so that only authorized users can access private routes
10. Ensure that the website does not lose any data when the browser is refreshed

## 💡 Tips

- Implement the application in phases
- Commit and push regularly to GitHub
- Leverage TypeScript to reduce bugs with strong typing
- Reuse components whenever possible
- Test frequently
- Fix all linting, TypeScript and formatting warnings early
- Run formatting when needed:

  ```bash
  npm run format
  ```

## 📝 Grading Criteria

- Grades will be based on completeness, efficiency and style
- Code should be well-organized, readable and properly structured
- Proper use of components is expected
- Application should meet all required functionality
- UI should be functional and reasonably consistent with the demo
- This assignment is worth **30%**
- **Plagiarism of any kind will be met with severe consequences**

## ⚠️ Important

- This starter code **must** but used

## 🚨 Caution

- Compliance with the TDSB’s Online Code of Conduct is expected
- Any violation(s) will result in immediate referral to school administration
