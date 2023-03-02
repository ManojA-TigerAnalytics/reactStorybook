import { createTheme } from '@mui/material'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#f7901d',
    },
  },
  shape: {
    borderRadius: 25,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            color: 'black',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          '& .MuiButton-root:hover': {
            color: 'white',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#c1c1c1 #1c1b1b',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: '#1c1b1b',
            width: '9px',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#c1c1c1',
            minHeight: 24,
            border: '3px solid #1c1b1b',
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus':
            {
              backgroundColor: '#959595',
            },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active':
            {
              backgroundColor: '#959595',
            },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
            {
              backgroundColor: '#959595',
            },
          '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: '#1c1b1b',
          },
        },
      },
    },
  },
})

export default darkTheme
