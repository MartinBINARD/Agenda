import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSignMutation } from '../../store/api/authApi';
import { setToken } from '../../store/slices/authSlice';
import AuthForm from './AuthForm';

export default function Login({ navigation }) {
    const dispatch = useDispatch();
    const [singIn, { data, isLoading, error }] = useSignMutation();
    const [httpError, setHttpError] = useState();
    const navigateToSignup = () => {
        navigation.replace('Signup');
    };
    const submitFormHandler = (values) => {
        singIn({ email: values.email, password: values.password, endpoint: 'signInWithPassword' }).then((response) => {
            SecureStore.setItemAsync('credentials', JSON.stringify(values));
            SecureStore.setItemAsync('refreshToken', response.data.refreshToken);
        });
    };

    useEffect(() => {
        if (data) {
            dispatch(setToken(data.idToken));
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            setHttpError(error);
        }
    }, [error]);

    return (
        <AuthForm
            loginScreen
            navigate={navigateToSignup}
            submitFormHandler={submitFormHandler}
            isLoading={isLoading}
            error={httpError}
            setHttpError={setHttpError}
        />
    );
}
