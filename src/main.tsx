import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import './styles/index.scss'
import { Provider } from 'react-redux';
import { store } from './redux/redux-store';
import { router } from './router';
import { ThemeProvider } from '@mui/material';
import theme from './styles/theme';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store} >
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
)
