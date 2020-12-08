import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ChatIcon from '@material-ui/icons/Chat';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
const useStyles = makeStyles({
    root: {
            width: '100%',
            position: 'fixed',
            bottom: 0,
    },
});

export default function BtmNav() {
    const classes = useStyles();
    const [value, setValue] = React.useState('profile');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
            <BottomNavigationAction label="CHAT" value="chat" icon={<ChatIcon />} />
            <BottomNavigationAction label="MATCH" value="match" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="PROFILE" value="profile" icon={<AccountCircleIcon />} />
            <BottomNavigationAction label="SETTINGS" value="settings" icon={<SettingsIcon />} />
        </BottomNavigation>
    );
}
