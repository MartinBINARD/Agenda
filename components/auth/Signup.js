import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSignMutation } from '../../store/api/authApi';
import AuthForm from './AuthForm';

export default function Signup({ navigation }) {
    const dispatch = useDispatch();
    const [signUp, { data, isLoading, error }] = useSignMutation();
    const navigateToLogin = () => {
        navigation.replace('Login');
    };
    const submitFormHandler = (values) => {
        signUp({ email: values.email, password: values.password, endpoint: 'signUp' });
    };

    useEffect(() => {
        if (data) {
            dispatch(setToken(data.idToken));
        }
    }, [data]);

    return <AuthForm navigate={navigateToLogin} submitFormHandler={submitFormHandler} isLoading={isLoading} />;
}
