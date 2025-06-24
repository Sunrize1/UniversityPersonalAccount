import GroupImage from '../../assets/images/Group.svg?react'
import styles from './Login.module.css';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { LoginInput } from '../../types/components/forms/LoginInput';
import { Input } from '../../components/UI/Input/Input';
import { Button } from '../../components/UI/Button/Button';
import { Switch } from '../../components/UI/Switch/Switch';
import { Container } from '../../components/UI/Container/Container';
import { useAppDispatch } from '../../store/hooks';
import { loginThunk } from '../../store/userSlice/userThunks';
import { showNotification } from '../../utils/notification';
import { NotificationTypeEnum } from '../../types/redux/NotificationTypeEnum';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    
    const methods = useForm<LoginInput>({
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        mode: 'onChange'
    }
    );
    const { register, handleSubmit, formState: { isValid, isSubmitting } } = methods;

    const onSubmit: SubmitHandler<LoginInput> = async (data) =>  {
        try {
            const result = await dispatch(loginThunk(data)).unwrap();
            if(result.loginSucceeded) {
                showNotification(dispatch, 'Успешный вход', NotificationTypeEnum.SUCCESS, 5000);
                navigate('/profile', { replace: true });
            } else {
                showNotification(dispatch, 'Неверный логин или пароль', NotificationTypeEnum.ERROR, 5000);
            }
          } catch (err) {
            showNotification(dispatch, 'Ошибка входа', NotificationTypeEnum.ERROR, 5000);
          } 
    }
    

    return (
        <Container>
            <div className={styles.wrapper}>
                <div className={styles.image}>
                    <GroupImage/>
                </div>
                <div className={styles.form}>
                    <h1 className={styles.title}><FormattedMessage id='login'/></h1>
                    <FormProvider {...methods}>
                        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)} >
                            <Input {...register("email", {
                                    required: "emailIsRequired",
                                    minLength: {
                                        value: 3,
                                        message: "emailValidation"
                                    },
                                    pattern: {
                                        value: /^\S*$/,
                                        message: "noSpacesAllowed"
                                    }
                                })}
                                label='email'
                                type='email'/>
                            <Input  {...register("password", {
                                    required: "passwordIsRequired",
                                    minLength: {
                                        value: 3,
                                        message: "passwordValidation"
                                    },
                                    pattern: {
                                        value: /^\S*$/,
                                        message: "noSpacesAllowed"
                                    }
                                    
                                })}
                                label='password'
                                type="password"/>
                            <Switch name="rememberMe" label='rememberMe' />
                            <Button className={styles.formButton} disabled={!isValid || isSubmitting } type="submit" >enter</Button>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </Container>
    );
}
