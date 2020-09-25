
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
    inputValue: string;
    handleAddSinger: any;
}




const SingerAutoCompletion: React.FC<Props> = ({ inputValue, handleAddSinger }) => {
    return (

        <Box component="div">
            {/* ただ単純に検索欄というよりは入力が近いときに補完を入れるようにしたい
              複数歌手を入れるとかやるなら結構入れたい。
              できれば引き算(こいつっぽくないほうが嬉しいとか)も
              精度の関係上10曲以上出してる歌手のみ検索できます */}
            {/* ここらへんの条件分岐を完全なものにしたい */}
            {(() => {
                if (inputValue === "a") {
                    //ここのsingersを非同期処理で持ってくればいい？
                    const singers = ["鬼束", "aiko", "ZONE", "ZARD", "嵐", "SMAP", "ゆず", "高橋優"]
                    const listItems = singers.map((singer: string) =>
                        <Grid item xs={12} key={singer}>
                            <Box component="div" m={1}>
                                <Paper>
                                    <Grid container>
                                        <Grid item xs={8}><Typography variant="h6">{singer}</Typography></Grid>
                                        <Grid item xs={4}>
                                            <IconButton key={singer} color="primary" aria-label="add" onClick={
                                                () => {
                                                    handleAddSinger(singer)
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
                        <Grid container>
                            {listItems}
                        </Grid>
                    )
                }
            })()}

        </Box>
    );

}
export default SingerAutoCompletion