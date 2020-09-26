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
import SuggestSinger from './SuggestSinger'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
    root: {
        width: 500,
    },
});

export default function LabelBottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState('Favorites');

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box component="div">
            <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
                <BottomNavigationAction value="Favorites" label="お気に入り" icon={<FavoriteIcon />} />
                <BottomNavigationAction value="Recents" label="履歴" icon={<HistoryIcon />} />
                <BottomNavigationAction value="Popular" label="人気" icon={<StarIcon />} />
                <BottomNavigationAction value="Trendingup" label="急上昇" icon={<TrendingUpIcon />} />
            </BottomNavigation>
            {
                (() => {
                    if (value === "Popular") {
                        return <SuggestSinger suggestType="人気" />
                    } else if (value === "Favorites") {
                        return <SuggestSinger suggestType="お気に入り" />
                    } else if (value === "Recents") {
                        return <SuggestSinger suggestType="履歴" />
                    } else if (value === "Trendingup") {
                        return <SuggestSinger suggestType="急上昇" />
                    }
                })()
            }
        </Box>
    );
}