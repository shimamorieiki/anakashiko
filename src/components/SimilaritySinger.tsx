import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';


const SimilaritySinger = () => {

    const singers = ["鬼束", "aiko", "ZONE", "ZARD", "鬼束", "aiko", "ZONE", "ZARD"]
    const listItems = singers.map((singer: string) =>
        <Grid item xs={12}>
            <Box component="div" m={1}>
                <Paper>
                    <Grid container>
                        <Grid item xs={1}><Typography variant="h6">1</Typography></Grid>
                        <Grid item xs={4}><Typography variant="h6">{singer}</Typography></Grid>
                        <Grid item xs={4}><Typography variant="h6">{singer}</Typography></Grid>
                        <Grid item xs={1}>
                            <IconButton size="small" aria-label="add" style={{ backgroundColor: "#ffaacc" }}>
                                <AddIcon />
                            </IconButton>
                            {/* <Fab size="small" aria-label="add">
                                <AddIcon />
                            </Fab> */}
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton size="small" aria-label="remove">
                                <RemoveIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton size="small" aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Grid>
    );


    return (
        <Grid container>
            {listItems}
        </Grid>
    );
}

export default SimilaritySinger