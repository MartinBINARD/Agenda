import { Formik } from 'formik';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Yup from 'yup';
import { colors } from '../../constants/colors';
import CustomBtn from '../modal/CustomBtn';
import ErrorModal from '../shared/ErrorModal';
import Input from '../shared/Input';

export default function AuthForm({ loginScreen, navigate, submitFormHandler, isLoading }) {
    const initialValues = loginScreen
        ? { email: '', password: '' }
        : {
              email: '',
              password: '',
              confirmPassword: '',
          };

    const confirmPasswordRule = !loginScreen
        ? {
              confirmPassword: Yup.string()
                  .oneOf([Yup.ref('password')], 'Les mots de passes ne correspondent pas')
                  .required('Les mots de passes ne correspondent pas'),
          }
        : {};

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("L'email est incorrect").required("L'email est obligatoire"),
        password: Yup.string().min(6, 'Le mot de passe doit faire au moins 6 caractères').required('Le mot de passe est obligatoire'),
        ...confirmPasswordRule,
    });

    return (
        <View style={styles.formContainer}>
            <Text style={styles.title}>{loginScreen ? 'Connexion' : 'Inscription'}</Text>
            <Formik initialValues={initialValues} onSubmit={submitFormHandler} validationSchema={validationSchema}>
                {({ values, handleChange, handleSubmit, errors, touched, handleBlur, isSubmitting, status, setStatus }) => {
                    if (isSubmitting && Object.keys(errors).length && status !== 'error') {
                        setStatus('error');
                    }

                    return (
                        <View>
                            <Input
                                label="Email"
                                maxLength={60}
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                error={!!errors.email && touched.email}
                                autoCapitalize="none"
                            />
                            <Input
                                label="Mot de passe"
                                maxLength={60}
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                error={!!errors.password && touched.password}
                                autoCapitalize="none"
                                type="password"
                            />
                            {!loginScreen ? (
                                <Input
                                    label="Confirmation du mot de passe"
                                    maxLength={60}
                                    value={values.confirmPassword}
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur('confirmPassword')}
                                    error={!!errors.confirmPassword && touched.confirmPassword}
                                    autoCapitalize="none"
                                    type="password"
                                />
                            ) : null}
                            <View style={styles.btnContainer}>
                                <CustomBtn text="Valider" onPress={handleSubmit} isLoading={isLoading} />
                            </View>
                            <ErrorModal isModalVisible={status == 'error'} closeModal={setStatus} errors={errors} />
                        </View>
                    );
                }}
            </Formik>
            <TouchableOpacity activeOpacity={0.8} onPress={navigate} style={styles.switchAuthContainer}>
                <Text style={styles.switchAuthText}>
                    {loginScreen ? "Vous n'avez pas encore de compte ? " : 'Vous avez déjà un compte ? '}
                </Text>
                <Text style={[styles.switchAuthText, styles.textBold]}>{loginScreen ? 'Inscrivez-vous' : 'Connectez-vous'}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        padding: 24,
        justifyContent: 'space-evenly',
    },
    title: {
        color: colors.LIGHT,
        textAlign: 'center',
        fontWeight: '800',
        fontSize: 24,
    },
    btnContainer: {
        alignItems: 'center',
    },
    switchAuthContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 32,
    },
    switchAuthText: {
        color: colors.LIGHT,
    },
    textBold: {
        fontWeight: '700',
    },
});
