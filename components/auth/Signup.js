import { useSignUpMutation } from '../../store/api/authApi';
import AuthForm from './AuthForm';

export default function Signup({ navigation }) {
    const [signUp, { data, isLoading, error }] = useSignUpMutation();
    const navigateToLogin = () => {
        navigation.replace('Login');
    };
    const submitFormHandler = (values) => {
        signUp({ email: values.email, password: values.password });
    };

    console.log(data);

    return <AuthForm navigate={navigateToLogin} submitFormHandler={submitFormHandler} isLoading={isLoading} />;
}
