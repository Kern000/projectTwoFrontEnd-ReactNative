const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_AUTH_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_AUTH_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_AUTH_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_AUTH_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_AUTH_APP_ID
};
                                                        
console.log("firebaseConfig loaded", firebaseConfig);   // this will load when initialized on APP.js useEffect

export default firebaseConfig;