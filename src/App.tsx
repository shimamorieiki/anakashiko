import React, { useState } from 'react';
import './App.css';
import Test from './components/test';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import SearchAppBar from './components/appBarWithSearchField';
import PersistentDrawerLeft from './components/PersistentDrawerLeft'
import TweetShare from './components/TweetShare'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Fab from '@material-ui/core/Fab';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, LabelList,
} from 'recharts';
import ReactWordcloud from 'react-wordcloud';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ReplayIcon from '@material-ui/icons/Replay';
import LabelBottomNavigation from './components/LabelBottomNavigation'
import SuggestSinger from './components/SuggestSinger'
import MicIcon from '@material-ui/icons/Mic';
import AppBar from '@material-ui/core/AppBar'
import SimilaritySinger from './components/SimilaritySinger'
// type Props = {
//   onChange: (event: React.MouseEvent<HTMLInputElement>) => void
// }

// {
//   (() => {
//     if (Number((store.getState()).Score.han) >= 1) {
//       return <TotalScore />
//     }
//   })()
// }

type resembleSingersValuesProps = {
  resembleSingersValues: {
    value: string,
  }[]
}
function App() {

  const [inputValue, setInputValue] = useState('');
  const [singerValue, setSingerValue] = useState('')
  // どうやら配列をhooksで持つのは大分ヤバそう
  // const [state, setState] = useState<string[]>([{
  //   name: "",
  //   address: "",
  // };
  const data = [
    { x: 100, y: 200, name: "a" },
    { x: 120, y: 100, name: "b" },
    { x: 170, y: 300, name: "c" },
    { x: 140, y: 250, name: "d" },
    { x: 150, y: 400, name: "e" },
    { x: 110, y: 280, name: "f" },
  ];

  const words = [
    {
      text: 'told',
      value: 64,
    },
    {
      text: 'mistake',
      value: 11,
    },
    {
      text: 'thought',
      value: 16,
    },
    {
      text: 'bad',
      value: 17,
    },
    {
      text: 'told',
      value: 64,
    },
    {
      text: 'mistake',
      value: 11,
    },
    {
      text: 'thought',
      value: 100,
    },
    {
      text: 'bad',
      value: 21,
    },
  ]


  // const addresembleSingersValue = (singer: string) => {
  //   setResembleSingersValue([
  //     ...resembleSingersValues,
  //     {
  //       value: singer
  //     }
  //   ]);
  // };

  const handleInputValue = (value: string) => {
    setInputValue(value);
  }

  const handleAddSinger = (value: string) => {
    setInputValue('');
    setSingerValue(value);
  }



  return (
    <div className="App">
      {/* <SearchAppBar /> */}
      {/* <Container
        // maxWidth="lg"
        style={{
          backgroundColor: '#cfe8fc'
        }}
      > */}
      {/* <PersistentDrawerLeft /> */}
      {/* <AppBar><Typography variant="h3">ANAKASHIKO</Typography></AppBar> */}
      <Grid container>
        <Grid item lg={12}>
          <SearchAppBar />
          {/* <LabelBottomNavigation /> */}
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box component="div">
            {/* <Typography variant="h4">検索欄</Typography> */}
            <FormControl>
              <InputLabel htmlFor="input-with-icon-adornment">
                歌手名を入力
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                value={inputValue}
                onChange={
                  (event: React.ChangeEvent<HTMLInputElement>) => {
                    handleInputValue(event.target.value)
                  }
                }
                startAdornment={
                  <InputAdornment position="start">
                    <MicIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            {/* ただ単純に検索欄というよりは入力が近いときに補完を入れるようにしたい
              複数歌手を入れるとかやるなら結構入れたい。
              できれば引き算(こいつっぽくないほうが嬉しいとか)も
              精度の関係上10曲以上出してる歌手のみ検索できます */}
            {/* ここらへんの条件分岐を完全なものにしたい */}
            {(() => {
              if (inputValue === "a") {
                const singers = ["鬼束", "aiko", "ZONE", "ZARD", "鬼束", "aiko", "ZONE", "ZARD"]
                const listItems = singers.map((singer: string) =>
                  <Grid item xs={12}>
                    <Box component="div" m={1}>
                      <Paper>
                        <Grid container>
                          <Grid item xs={8}><Typography variant="h6">{singer}</Typography></Grid>
                          <Grid item xs={4}>
                            <Fab key={singer} color="primary" aria-label="add" onClick={
                              () => {
                                handleAddSinger(singer)
                              }
                            }>
                              <AddIcon />
                            </Fab>
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
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box component="div">

            <Typography variant="h3">{singerValue}</Typography>
            <Typography variant="h4">プロフィール</Typography>
            {(() => {
              if (singerValue === "ZONE") {
                return (
                  <Typography variant="h6">
                    <a href="https://ja.wikipedia.org/wiki/ZONE_(%E3%83%90%E3%83%B3%E3%83%89)">wikipedia</a>
                  </Typography>
                )
              } else if (singerValue === "鬼束ちひろ") {
                return (
                  <Typography variant="h6">
                    <a href="https://ja.wikipedia.org/wiki/%E9%AC%BC%E6%9D%9F%E3%81%A1%E3%81%B2%E3%82%8D">wikipedia</a>
                  </Typography>
                )
              }
            })()}
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box component="div" m={1}>
            <Typography variant="h4">特徴的な単語</Typography>

            結構ストップワードの選別がきつかった記憶がある
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box component="div" m={1}>
            <Typography variant="h4">ワードクラウド</Typography>
            <Fab size="small" aria-label="remove">
              <ReplayIcon />
            </Fab>
            <ReactWordcloud words={words} />
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box component="div" m={1}>
            <Typography variant="h4">歌手別類似度</Typography>
            {(() => {
              if (singerValue !== "") {
                return (
                  <Typography variant="h6">{singerValue}と似ている歌手</Typography>
                )
              }
            })()}
            <SimilaritySinger />

            <ScatterChart
              width={300}
              height={300}
              margin={{
                top: 20, right: 20, bottom: 20, left: 20,
              }}
            >
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="stature" />
              <YAxis type="number" dataKey="y" name="weight" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="類似歌手" data={data} fill="#fffaaa">
                <LabelList dataKey="name" />
              </Scatter>
            </ScatterChart>
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box component="div" m={1}>
            <SuggestSinger suggestType="人気" />
            <SuggestSinger suggestType="お気に入り" />
            <SuggestSinger suggestType="急上昇" />
            <SuggestSinger suggestType="履歴" />
          </Box>
        </Grid>
        <TweetShare />
      </Grid>
      {/* </Container> */}
    </div>
  );
}

export default App;
