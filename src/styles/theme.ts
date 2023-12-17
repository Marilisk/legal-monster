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
/* 
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    employeesList: true;
  }
} */

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
            // fontFamily: ['Stapel', 'sans-serif', ].join(','),
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
            // marginBottom: 10,

          }
        },
        {
          props: { variant: 'h4' },
          style: {
            fontSize: 16,
          }
        },
        {
          props: { variant: 'h6' },
          style: {
            // fontFamily: ['Stapel', 'sans-serif', ].join(','),
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
            // fontFamily: ['Stapel', 'sans-serif', ].join(','),
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
    /* MuiAutocomplete: {
      styleOverrides: {
        tag: {
          marginLeft: 0,
          marginRight: 2,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: '#ff0b1b',
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '&:after, &:hover:not(.Mui-disabled, .Mui-error):before': {
            borderColor: '#ff0b1b',
            borderWidth: '1px',
          },
        },
      },
    }, */
    /* MuiMenu: {
      defaultProps: {
        TransitionProps: {
          timeout: 100,
        },
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      },
      styleOverrides: {
        paper: {
          borderRadius: 0,
          '& .MuiList-padding': {
            padding: '4px 0'
          }
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontWeight: 300,
          minHeight: 26,
          lineHeight: 1,
          fontSize: 14,
        }
      },
    }, */
    /* MuiTooltip: {
      defaultProps: {
        arrow: true
      },
      styleOverrides: {
        tooltip: {
          backgroundColor: '#fff',
          color: '#000',
          boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.12)',
          padding: '.8em 1em',
          '& p:not(:last-of-type)': {
            marginBottom: '.5em',
          },
          fontSize: '12px',
          fontWeight: '300',
          '& .scollInner': {
            margin: '-.8em -1em',
            padding: '1em',
            maxHeight: '50vh',
            overflow: 'auto',
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#D9D9D9',
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar': {
              width: '3px',
            },
            '&::-webkit-scrollbar-track': {
              border: 'none'
            }
          }
        },
        arrow: {
          color: '#fff',
        }
      },
    } */
  },
})
  ;

export default theme;
