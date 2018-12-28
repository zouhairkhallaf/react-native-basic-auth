import React, {Component} from 'react';
import firebase from 'firebase';
import { Text }from 'react-native'
import { Button, Card, CardSection, Input } from './common';

class LoginForm extends Component {
    state = { 
        email: '',
        password: '',
        error: ''
    };

    onButtonPress(){
        const { email, password } = this.state 
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(() => { // If the sign in fails => attemp to create an account 
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .catch(() => { // If account creation fails then we show an error
                        this.setState({error: 'Authentication failed'})
                    });
            });
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
                        placeholder='**********'
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>
                
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Log In
                    </Button>
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
