import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID
}

const isConfigValid = () => Object.values(config).every(value => !!value)

const app = isConfigValid() ? firebase.initializeApp(config) : null
export const db = isConfigValid() ? app.firestore() : null
export const auth = isConfigValid() ? app.auth() : null