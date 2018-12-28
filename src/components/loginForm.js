import React, {Component} from 'react';
import firebase from 'firebase';
import { Text }from 'react-native'
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
    
    state = this.setInitialState();

    setInitialState () {
        return ( {
            email: '',
            password: '',
            error: '',
            loading: false
        })
    }

    onButtonPress(){
        const { email, password } = this.state 
        this.setState({ error: '', loading: true })
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLogingSuccess.bind(this))
            .catch(() => { // If the sign in fails => attemp to create an account 
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLogingSuccess.bind(this))
                    .catch(this.onLoginFail.bind(this));
            });
    }

    onLogingSuccess(){
        this.setState(this.setInitialState())
    }

    onLoginFail(){
        this.setState({ error: 'Authenication Failed', loading :false })
    }

    renderButton() {
        return ( this.state.loading ? <Spinner size='small' /> : <Button onPress={this.onButtonPress.bind(this)} buttonText= 'Sign In'/> );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input 
                        label="Email"
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        placeholder='userName@gmail.com'
                    />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        placeholder='Password'
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>
                
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    } 
};

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

export default LoginForm;
