import Rebase from 're-base';
import firebase from 'firebase';
import firebaseui from 'firebaseui';

const app = firebase.initializeApp({
    apiKey: "AIzaSyAArRHUo0lgs2KAXVZ4wqIrxSSzlE-pu6M",
    authDomain: "catch-of-the-day-jackkill.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-jackkill.firebaseio.com",
    projectId: "catch-of-the-day-jackkill"
});
const base = Rebase.createClass(app.database());

export default base;