import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSignMutation } from '../../store/api/authApi';
import { setIsSignIn, setToken } from '../../store/slices/authSlice';
import AuthForm from './AuthForm';

export default function Login({ navigation }) {
    const dispatch = useDispatch();
    const [singIn, { data, isLoading, error }] = useSignMutation();
    const navigateToSignup = () => {
        navigation.replace('Signup');
    };
    const submitFormHandler = (values) => {
        singIn({ email: values.email, password: values.password, endpoint: 'signInWithPassword' });
    };

    useEffect(() => {
        if (data) {
            dispatch(setToken(data.idToken));
        }
    }, [data]);

    return <AuthForm loginScreen navigate={navigateToSignup} submitFormHandler={submitFormHandler} isLoading={isLoading} />;
}
