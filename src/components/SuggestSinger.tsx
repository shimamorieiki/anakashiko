
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import IconButton from '@material-ui/core/IconButton';

// interface Props {
//     singers: {
//         name: string;
//     }[];
//     recommendtype: string;
// }

type Props = {
    suggestType: string;
}




const SuggestSinger: React.FC<Props> = ({ suggestType }) => {
    // const singers = props.singers
    const singers = ["鬼束", "aiko", "ZONE", "ZARD"]
    const listItems = singers.map((singer: string) =>
        <Grid item xs={12} key={singer}>
            <Box component="div" m={1}>
                <Paper>
                    <Grid container>
                        <Grid item xs={1}><Typography variant="h6">1</Typography></Grid>
                        <Grid item xs={4}><Typography variant="h6">{singer}</Typography></Grid>
                        <Grid item xs={4}><Typography variant="h6">{singer}</Typography></Grid>
                        <Grid item xs={1}>
                            <IconButton size="small" aria-label="search">
                                <ArrowRightIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Grid>
    );

    return (
        <Grid container>
            <Typography variant="h4">{suggestType}</Typography>.
            {listItems}
        </Grid>
    );
}

export default SuggestSinger