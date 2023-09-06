import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';
import styles from './Header.module.css';

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => {
  // ... (styles for IOSSwitch)
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff5722',
    },
    secondary: {
      main: '#9c27b0',
    },
  },
});

interface HeaderProps {
  toMap: boolean; // Declare a prop called "toMap" with type boolean
}

function Header(props: HeaderProps) {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.backgroundHeader}>
        <FormControlLabel control={<IOSSwitch sx={{ m: 1 }} defaultChecked />} />
        {props.toMap ? (
          <Link to="/map" className={styles.linkToEvents}>
            Mapa
          </Link>
        ) : (
          <Link to="/events" className={styles.linkToEvents}>
            Eventos
          </Link>
        )}
      </div>
    </ThemeProvider>
  );
}

export default Header;
