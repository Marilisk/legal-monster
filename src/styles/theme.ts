import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: false;
    xl: false;
    sxga: true;
    sxgap: true;
    fhd: true;
  }
}


const theme = createTheme({
  shape: {
    borderRadius: 10,
  },
  spacing: 10,
  
  palette: {
    primary: {
      main: '#69BFAF',
    },
    text: {
      primary: '#36403E',
      disabled: '#7C7D7D',
    },
    grey: {
      100: '#ececec',
      200: '#E1E9F2',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      sxga: 1280,
      sxgap: 1513,
      fhd: 1920,
    },
  },
  typography: {
    fontFamily: [
      'Mulish', 'sans-serif', 
    ].join(','), 
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: 'h1' },
          style: {
            fontSize: 40,
            fontWeight: 500,
          }
        },
        {
          props: { variant: 'h2' },
          style: {
            fontSize: 28,
            fontWeight: 500,
            marginBottom: 10,
          }
        },
        {
          props: { variant: 'h3' },
          style: { 
            fontSize: 18,
            fontWeight: 700,
          }
        },
        {
          props: { variant: 'h4' },
          style: {
            fontSize: 16,
          }
        },
        {
          props: { variant: 'h5' },
          style: {
            fontSize: 16,
          }
        },
        {
          props: { variant: 'h6' },
          style: {
            fontSize: 14,
            fontWeight: 700,
          }
        },
        {
          props: { variant: 'body2' },
          style: {
            fontSize: 12,
          }
        },
        {
          props: { variant: 'subtitle1' },
          style: {
            fontSize: 18,
            fontWeight: 500,
          }
        },
      ],
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
         root: {
          border: '1px solid #E1E9F2',
          borderRadius: '8px',
          padding: '20px'
          // background: '',
          // boxShadow: '0 0 5px rgba(0, 0, 0, 0.25)',
        }, 
      },
    },
    MuiDivider: {
      defaultProps: {
        
      },
      styleOverrides: {
         root: {
          borderColor: '#E1E9F2',
          marginBottom: '20px',
          marginTop: '20px',
        }, 
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "filled",
      }
    }
    
  },
})
  ;

export default theme;
