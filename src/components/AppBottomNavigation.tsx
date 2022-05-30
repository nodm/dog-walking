import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MapIcon from '@mui/icons-material/Map';
import RouteIcon from '@mui/icons-material/Route';

const LINKS = ['/', '/route-recorder', '/favorites'];

export function AppBottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(LINKS.findIndex(path => path === location.pathname));

  return (
    <Paper elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          navigate(LINKS[newValue]);
        }}
      >
        <BottomNavigationAction label="Leaflet Map" icon={<MapIcon />} />
        <BottomNavigationAction label="Create route" icon={<RouteIcon />} />
        <BottomNavigationAction label="Mapbox Map" icon={<FavoriteIcon />} />
      </BottomNavigation>
    </Paper>
  );
}

export default AppBottomNavigation;
