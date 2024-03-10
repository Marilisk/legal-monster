import { Outlet, useNavigate } from 'react-router-dom';
import c from './styles/App.module.scss'
import { Header } from './Components/Header/Header';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { refreshAuth, selectIsAuth } from './redux/authSlice';
import { useEffect } from 'react';
import { LoadingDotsPreloader } from './assets/LoadingDots/LoadingDotsPreloader';
import { LoadingStatusEnum } from './types/userTypes';
import { useLoadAppData } from './utils/helpers/useLoadAppData';


function App() {

  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(selectIsAuth)
  const authLoadingStatus = useAppSelector(s => s.auth.loginData.status)
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(refreshAuth())
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isAuth && !localStorage.getItem('token')) {
      navigate('/login')
    }
  }, [navigate, isAuth, authLoadingStatus])

  useEffect(() => {
    if (authLoadingStatus === LoadingStatusEnum.error && localStorage.getItem('token')) {
      localStorage.removeItem('token')
      navigate('/login')
    }
  }, [navigate, isAuth, authLoadingStatus])

  useLoadAppData()

  if (localStorage.getItem('token') && !isAuth) {
    return <LoadingDotsPreloader />
  }
  if (authLoadingStatus === LoadingStatusEnum.loading) {
    return <LoadingDotsPreloader />
  }

  return <div>
    <Header isAuth={isAuth} />
    <div className={c.appWrapper} >
      <Outlet />
    </div>
  </div>
}

export default App;
