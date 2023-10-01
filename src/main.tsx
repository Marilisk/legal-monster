import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import './styles/index.scss'
import { Provider } from 'react-redux';
import {store} from './redux/redux-store';
import { router } from './router';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store} >
    <RouterProvider router={router} />
  </Provider>
)
