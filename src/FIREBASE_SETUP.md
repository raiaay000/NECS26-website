# Firebase Authentication Setup Guide

This NECS 2026 platform uses Firebase for secure user authentication. Follow these steps to configure Firebase:

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" or select an existing project
3. Follow the setup wizard to create your project

## Step 2: Register Your Web App

1. In your Firebase project, click the **Web icon** (`</>`) to add a web app
2. Register your app with a nickname (e.g., "NECS 2026 Platform")
3. Copy the Firebase configuration object

## Step 3: Enable Authentication

1. In the Firebase Console, go to **Authentication** from the left sidebar
2. Click **Get Started** if you haven't enabled Authentication yet
3. Click on the **Sign-in method** tab
4. Click on **Email/Password**
5. Toggle **Enable** and click **Save**

## Step 4: Configure Environment Variables

1. Copy `.env.example` to create a new `.env` file in the root directory
2. Fill in your Firebase configuration values:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Step 5: Test Authentication

1. Start your development server
2. Click the **Login** button in the top right
3. Try creating a new account with email and password
4. You should see a success message and be logged in automatically

## Features Enabled

✅ **Email/Password Authentication** - Users can create accounts and sign in securely  
✅ **Persistent Sessions** - Users stay logged in across page refreshes  
✅ **Profile Management** - User display names and email are stored  
✅ **Secure Logout** - Users can safely sign out  
✅ **Guest Mode** - Users can browse without creating an account  

## Security Best Practices

- Never commit your `.env` file to version control
- Keep your Firebase API keys secure
- Configure Firebase Security Rules in the Firebase Console
- Set up authorized domains in Firebase Authentication settings

## Troubleshooting

### "auth/configuration-not-found" Error
- Make sure you've created a `.env` file with valid Firebase credentials
- Restart your development server after adding environment variables

### "auth/invalid-api-key" Error
- Double-check that your API key is correct in the `.env` file
- Ensure there are no extra spaces or quotes around the values

### Users Can't Sign Up
- Verify Email/Password authentication is enabled in Firebase Console
- Check the browser console for detailed error messages

## Support

For more information, visit the [Firebase Authentication Documentation](https://firebase.google.com/docs/auth/web/start).
