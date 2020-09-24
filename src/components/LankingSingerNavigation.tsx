import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import HistoryIcon from '@material-ui/icons/History';
import StarIcon from '@material-ui/icons/Star';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
    root: {
        width: 500,
    },
});

export default function LankingSingerNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState('Search');

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
    };

    return (
        // これはもしかして続きを読むでリロードさせたほうが賢いのでは？
        <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
            <BottomNavigationAction value="Search" label="上位20曲" icon={<SearchIcon />} />
            <BottomNavigationAction value="Favorites" label="上位50曲" icon={<FavoriteIcon />} />
            <BottomNavigationAction value="Recents" label="上位100曲" icon={<HistoryIcon />} />
        </BottomNavigation>
    );
}