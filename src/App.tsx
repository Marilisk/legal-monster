import { Outlet, useNavigate } from 'react-router-dom';
import c from './styles/App.module.scss'
import { Header } from './Components/Header/Header';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { refreshAuth, selectIsAuth } from './redux/authSlice';
import { useEffect } from 'react';
import { LoadingDotsPreloader } from './assets/LoadingDots/LoadingDotsPreloader';
import { LoadingStatusEnum } from './types/userTypes';


function App() {

  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(selectIsAuth)
  const isLoading = useAppSelector(s => s.auth.loginData.status === LoadingStatusEnum.loading)
  const navigate = useNavigate()
  //console.log('isAuth', isAuth)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(refreshAuth());
    }
  }, [dispatch]);

  useEffect(() => {
    //if (!isPipelineCustom) dispatch(setSalesPipeline(defaultPipeline))
    if (!isAuth /* && !document.cookie !localStorage.getItem('token') */) {
      navigate('/login')
    }
  }, [navigate, isAuth])

  if (localStorage.getItem('token') && !isAuth) {
    return <LoadingDotsPreloader />
  } 
  /* if (isLoading) {
    return <LoadingDotsPreloader />
  } */

  return <div >
    <Header isAuth={isAuth} />
    <div className={c.appWrapper} >
      <Outlet />
    </div>
  </div>
}

export default App;
