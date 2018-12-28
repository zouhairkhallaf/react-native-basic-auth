import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common'; 
import LoginForm from './components/loginForm';

class App extends Component {
    state = {
        loggedIn: null
    }

    componentWillMount(){
        firebase.initializeApp({
            apiKey: "AIzaSyD5lcMO7WV211D5q6h0hxsEXJGJiLGbtTI",
            authDomain: "authentication-61ef5.firebaseapp.com",
            databaseURL: "https://authentication-61ef5.firebaseio.com",
            projectId: "authentication-61ef5",
            storageBucket: "authentication-61ef5.appspot.com",
            messagingSenderId: "908969154918"
          });
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                this.setState({loggedIn: true})
            }else{
                this.setState({loggedIn: false})
            }
        });
    }

    renderContent(){
        switch (this.state.loggedIn) {
            case true:
                return (<View style={{height: 40}}><Button buttonText='log Out' onPress={()=> firebase.auth().signOut()} /></View>);
            case false:
                return (<LoginForm />);
            default:
                return (<Spinner />);
        }
    }

    render(){
        return (
            <View>
                <Header headerText="Authentication" />              
                {this.renderContent()}
            </View>
        );
    };
};

export default App;
