// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyC6OyPl_7PqSW7GIfYt52-y5z72-z2_kiY',
	authDomain: 'elel-245bf.firebaseapp.com',
	projectId: 'elel-245bf',
	storageBucket: 'elel-245bf.appspot.com',
	messagingSenderId: '536339928780',
	appId: '1:536339928780:web:08455df7aa2444f58c1469',
	measurementId: 'G-GZ9V8Y0MW2',
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
