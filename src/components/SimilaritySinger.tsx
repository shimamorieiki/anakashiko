import React, { useState, useEffect } from 'react';
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
import axios from 'axios';

interface Props {
    singers: {
        id: number;
        name: string;
        similarity: number;
        first: number;
        second: number;
    }[]
}

const SimilaritySinger: React.FC<Props> = ({ singers }) => {
    //多分これだと発火しない気がしてきた
    //一番自然なのは親で取ってきてそれを子がもらうパターン
    // const sampleApiURL = 'https://jsondata.okiba.me/v1/json/6zYKL200924074420';
    // const [state, setState] = useState([
    //     { id: 1, name: "鬼塚ちひろ", similarity: 0.99, first: 30, second: 30 },
    //     { id: 2, name: "ZONE", similarity: 0.99, first: 21, second: 20 }
    // ])
    // // const [state, setState] = useState()
    // const [num, setNum] = useState(5)
    // var singersList = state;


    // useEffect(() => {
    //     axios
    //         .get(sampleApiURL)
    //         .then((results) => {
    //             for (let i = 0; i < num; i++) {
    //                 singersList.push({
    //                     id: results.data[i].id,
    //                     name: results.data[i].name,
    //                     similarity: results.data[i].similarity,
    //                     first: results.data[i].first,
    //                     second: results.data[i].second
    //                 });
    //                 // console.log(results.data[i].id);
    //             }
    //             setState(singersList)
    //             console.log(state);

    //         }).catch(() => {
    //             console.log("失敗した");

    //         });
    // })

    var listItems = singers.map((singer) =>
        <Grid item xs={12} key={singer.name}>
            <Box component="div" m={1}>
                <Paper>
                    <Grid container>
                        <Grid item xs={1}><Typography variant="h6">{singer.id}</Typography></Grid>
                        <Grid item xs={4}><Typography variant="h6">{singer.name}</Typography></Grid>
                        <Grid item xs={4}><Typography variant="h6">{singer.similarity}</Typography></Grid>
                        <Grid item xs={1}>
                            <IconButton size="small" aria-label="add" style={{ backgroundColor: "#ffaacc" }} key={singer.name}>
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