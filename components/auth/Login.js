import AuthForm from './AuthForm';

export default function Login({ navigation }) {
    const navigateToSignup = () => {
        navigation.replace('Signup');
    };
    const submitFormHandler = (values) => {
        console.log(values);
    };

    return <AuthForm loginScreen navigate={navigateToSignup} submitFormHandler={submitFormHandler} isLoading={false} />;
}
