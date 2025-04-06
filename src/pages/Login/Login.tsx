import GroupImage from '../../assets/images/Group.svg?react'
import styles from './Login.module.css';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { LoginInput } from '../../types/components/forms/LoginInput';
import { Input } from '../../components/UI/Input/Input';
import { Button } from '../../components/UI/Button/Button';
import { Switch } from '../../components/UI/Switch/Switch';
import { Container } from '../../components/UI/Container/Container';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginThunk } from '../../store/userSlice/userThunks';
import { NotificationPopup } from '../../components/common/NotificationPopup/NotificationPopup';

export const Login = () => {
    const dispatch = useAppDispatch();
    const methods = useForm<LoginInput>({
        defaultValues: {
            rememberMe: false,
        }
    }
    );
    const { register, handleSubmit } = methods;

    const onSubmit: SubmitHandler<LoginInput> = async (data) =>  {
        try {
            const resultAction = await dispatch(loginThunk(data));
            
            
            console.log('Login successful', resultAction);
            
          } catch (err) {
            console.log(err)
          } 
    }
    

    return (
        <Container>
            <div className={styles.wrapper}>
                <div className={styles.image}>
                    <GroupImage/>
                </div>
                <div className={styles.form}>
                    <h1 className={styles.title}>Вход в аккаунт</h1>
                    <FormProvider {...methods}>
                        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)} >
                            <Input label='Электронная почта'   {...register("email", {
                                    required: "Email is required",
                                    minLength: {
                                        value: 3,
                                        message: "Username must be at least 3 characters"
                                    }
                                })}
                                type='email'/>
                            <Input label='Пароль'  {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 3,
                                        message: "Username must be at least 3 characters"
                                    }
                                    
                                })}
                                type="password"/>
                            <Switch name="rememberMe" label='Запомнить меня' />
                            <Button type="submit" >ВОЙТИ</Button>
                        </form>
                    </FormProvider>
                </div>
            </div>
            <NotificationPopup></NotificationPopup>
        </Container>
    );
}
