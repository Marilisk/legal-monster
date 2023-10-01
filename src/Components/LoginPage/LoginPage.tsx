import { useEffect, useState } from 'react';
import { selectIsAuth } from '../../redux/authSlice';
import { useAppSelector } from '../../redux/hooks';
import { LoginForm } from './LoginForm/LoginForm';
import c from './LoginPage.module.scss'
import { useNavigate } from 'react-router-dom';
import RegisterForm from './RegisterForm/RegisterForm';

const LoginPage = () => {

    const isAuth = useAppSelector(selectIsAuth)
    const navigate = useNavigate()
    const loadingStatus = useAppSelector(s => s.auth.loginData.status)

    const [isRegisterPage, setIsRegisterPage] = useState(false)


    useEffect(() => {
        if (isAuth) {
            navigate('/');
        }
    })


    return <div className={c.wrap}>

        <div className={c.container}>

            {isRegisterPage ?
                <div>
                    <h1>Регистрация нового пользователя:</h1>
                    <RegisterForm loadingStatus={loadingStatus} />
                    <div className={c.registerOffer}>
                        <p>Уже есть аккаунт?
                            <button onClick={() => setIsRegisterPage(false)}>
                                Вам сюда
                            </button>
                        </p>
                    </div>
                </div>
                :
                <div>
                    <h1>Войдите в свой аккаунт</h1>
                    <LoginForm loadingStatus={loadingStatus} />

                    <div className={c.registerOffer}>
                        <p>Еще не зарегистрированы?
                            <button onClick={() => setIsRegisterPage(true)}>
                                Тогда Вам сюда
                            </button>
                        </p>
                    </div>
                </div>
            }

            <div>
                <div className={c.imgLogoWrap} />
                <p>Войдите как администратор своей сети или приглашенный сотрудник. Система автоматически определит полномочия.</p>
            </div>
        </div>
    </div>

};

export default LoginPage;


