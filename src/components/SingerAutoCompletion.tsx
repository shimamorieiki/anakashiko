
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AddIcon from '@material-ui/icons/Add';

import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, LabelList,
} from 'recharts';
import ReactWordcloud from 'react-wordcloud';
import ReplayIcon from '@material-ui/icons/Replay';
import MicIcon from '@material-ui/icons/Mic';
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton';

// interface Props {
//     singers: {
//         name: string;
//     }[];
//     recommendtype: string;
// }

type Props = {
    handleAddSinger: any;
    autoCompletionValue: {
        id: number;
        name: string;
    }[];
}




const SingerAutoCompletion: React.FC<Props> = ({ handleAddSinger, autoCompletionValue }) => {
    const listItems = autoCompletionValue.map((singer) =>
        <Grid item xs={12} key={singer.name}>
            <Box component="div" m={1}>
                <Paper>
                    <Grid container>
                        <Grid item xs={8}><Typography variant="h6">{singer.name}</Typography></Grid>
                        <Grid item xs={4}>
                            <IconButton key={singer.name} color="primary" aria-label="add" onClick={
                                () => {
                                    handleAddSinger(singer.name)
                                }
                            }>
                                <AddIcon />
                            </IconButton>
                            {/* <Fab key={singer} color="primary" aria-label="add" onClick={
                                            () => {
                                                handleAddSinger(singer)
                                            }
                                        }>
                                            <AddIcon />
                                        </Fab> */}
                        </Grid>
                        {/* <Grid item xs={4}>
                          <Fab key="鬼束ちひろ" color="secondary" aria-label="edit" onClick={handleOnClick}>
                            <RemoveIcon />
                          </Fab>
                        </Grid> */}
                    </Grid>
                </Paper>
            </Box>
        </Grid>
    );

    return (
        <Box component="div">
            <Grid container>
                {listItems}
            </Grid>
        </Box>
    );

}
export default SingerAutoCompletion