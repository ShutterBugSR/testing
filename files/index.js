import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { firebaseConfig } from '../config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const Otp = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const [code, setCode] = useState('');
    const [verificationSent, setVerificationSent] = useState(false); // Track if verification code has been sent

    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider.verifyPhoneNumber(phoneNumber, firebase.auth().settings)
            .then((id) => {
                setVerificationId(id);
                setVerificationSent(true); // Update state to indicate verification code has been sent
                Alert.alert('Verification code sent successfully');
            })
            .catch((error) => {
                // Show an alert in case of error
                alert(error);
            });
    };

    const confirmCode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
        firebase.auth().signInWithCredential(credential)
            .then(() => {
                setCode('');
                Alert.alert('OTP Verified successfully');
            })
            .catch((error) => {
                // Show an alert in case of error
                alert(error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.otpText}>Login using OTP</Text>
            <TextInput
                placeholder='Phone Number With Country code'
                onChangeText={setPhoneNumber}
                keyboardType='phone-pad'
                autoCompleteType='tel'
                style={styles.textInput}
            />
            <TouchableOpacity style={styles.sendVerification} onPress={sendVerification}>
                <Text style={styles.buttonText}>Send Verification Code</Text>
            </TouchableOpacity>
            
            {verificationSent && ( // Conditionally render OTP input field and confirmation button after verification code sent
                <>
                    <TextInput
                        placeholder='Enter OTP'
                        onChangeText={setCode}
                        keyboardType='number-pad'
                        style={styles.textInput}
                    />
                    <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
                        <Text style={styles.buttonText}>Confirm Verification</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

export default Otp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingHorizontal: 20,
        fontSize: 18,
        borderBottomColor: '#fff',
        borderBottomWidth: 2,
        marginBottom: 20,
        textAlign: 'center',
        color: '#fff'
    },
    sendVerification: {
        padding: 15,
        backgroundColor: '#3498db',
        borderRadius: 10,
        marginBottom: 20,
    },
    sendCode: {
        padding: 15,
        backgroundColor: '#9b59b6',
        borderRadius: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
    },
    otpText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
});
