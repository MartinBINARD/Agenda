import AuthForm from './AuthForm';

export default function Signup({ navigation }) {
    const navigateToLogin = () => {
        navigation.replace('Login');
    };
    const submitFormHandler = (values) => {
        console.log(values);
    };

    return <AuthForm navigate={navigateToLogin} submitFormHandler={submitFormHandler} isLoading={false} />;
}
