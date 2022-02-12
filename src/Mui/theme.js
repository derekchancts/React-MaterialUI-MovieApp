
import { createTheme } from '@mui/material/styles';
import { purple, green, red } from '@mui/material/colors';



const theme = createTheme({
  palette: {
    // primary: green,
    secondary: red,
    // mode: toggleMode ? 'dark' : 'light',

    // primary: {
      // main: '#fffeee'
      // main: purple[300]
      // main: '#000'
    // }
  },

  // status: {
  //   danger: 'orange'
  // },
  
  // typography: {
  //   h1: {
  //     fontSize: '1rem'
  //   }
  // }
  components: {
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          // backgroundColor: 'yellow'
          // color: 'white'
        },
        defaultProps: {
         
        }  
      },
    }
  }

})


export const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
});


export default theme;