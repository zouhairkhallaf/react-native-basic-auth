import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header } from './components/common'; 
import LoginForm from './components/loginForm';

class App extends Component {
    componentWillMount(){
        firebase.initializeApp({
            apiKey: "AIzaSyD5lcMO7WV211D5q6h0hxsEXJGJiLGbtTI",
            authDomain: "authentication-61ef5.firebaseapp.com",
            databaseURL: "https://authentication-61ef5.firebaseio.com",
            projectId: "authentication-61ef5",
            storageBucket: "authentication-61ef5.appspot.com",
            messagingSenderId: "908969154918"
          });
    }
    render(){
        return (
            <View>
                <Header headerText="authentication Z" />
                <LoginForm />
            </View>
        );
    };
};

export default App;
