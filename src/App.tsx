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
import SingerSimilarityScatterChart from './components/SingerSimilarityScatterChart';
import SingerSimilarityWordcloud from './components/SingerSimilarityWordcloud';
import SingerProfile from './components/SingerProfile';
import SingerAutoCompletion from './components/SingerAutoCompletion';
import IconButton from '@material-ui/core/IconButton';
import AnnouncementIcon from '@material-ui/icons/Announcement';
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



  // const addresembleSingersValue = (singer: string) => {
  //   setResembleSingersValue([
  //     ...resembleSingersValues,
  //     {
  //       value: singer
  //     }
  //   ]);
  // };

  const handleInputValue = (value: string) => {
    setSingerValue('');
    setInputValue(value);
  }

  const handleAddSinger = (value: string) => {
    setInputValue('');
    setSingerValue(value);
  }



  return (
    <div className="App">
      <SearchAppBar />
      <Container
        maxWidth="lg"
        style={{
          backgroundColor: '#cfe8fc'
        }}
      >
        {/* <PersistentDrawerLeft /> */}
        {/* <AppBar><Typography variant="h3">ANAKASHIKO</Typography></AppBar> */}
        <Grid container>
          <Grid item lg={12}>
            <LabelBottomNavigation />
          </Grid>

          <Grid item xs={12} lg={12}>
            <Box component="div">
              {/* <Typography variant="h4">検索欄</Typography> */}
              <FormControl>
                <InputLabel htmlFor="input-with-icon-adornment">
                  歌手名を入力
              </InputLabel>
                <Input
                  id="input-with-icon-adornment"
                  value={inputValue}
                  placeholder="例:あいみょん"
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
              <SingerAutoCompletion
                inputValue={inputValue}
                handleAddSinger={handleAddSinger}
              />
            </Box>
          </Grid>
          {(() => {
            if (singerValue !== "") {
              return (
                <Box component="div">
                  <Grid item xs={12} lg={12}>
                    <SingerProfile name={singerValue} />
                  </Grid>
                  <Grid item xs={12} lg={12}>
                    <Box component="div" m={1}>
                      <Typography variant="h4">特徴的な単語</Typography>
                      <p>結構ストップワードの選別がきつかった記憶がある</p>
                    </Box>
                  </Grid>
                  <Grid item xs={12} lg={12}>
                    <Typography variant="h4">ワードクラウド</Typography>
                    <IconButton aria-label="delete">
                      <ReplayIcon color="secondary" />
                    </IconButton>
                    <SingerSimilarityWordcloud />
                  </Grid>
                  <Grid item xs={12} lg={12}>
                    <Typography variant="h4">歌手別類似度</Typography>
                    <Typography variant="h6">{singerValue}と似ている歌手</Typography>
                    <IconButton>
                      <AnnouncementIcon color="secondary" />
                      {/* あれで「+」だったら検索に追加
                      「-」だったら似てない方に追加　
                      「虫眼鏡」だったらそれを新たな候補として検索 */}
                    </IconButton>
                    <SimilaritySinger />
                    <SingerSimilarityScatterChart />
                  </Grid>
                </Box>
              )
            } else {
              return (
                <Grid item xs={12} lg={12}>
                  <Box component="div" m={1}>
                    <SuggestSinger suggestType="人気" />
                    <SuggestSinger suggestType="お気に入り" />
                    <SuggestSinger suggestType="急上昇" />
                    <SuggestSinger suggestType="履歴" />
                  </Box>
                </Grid>
              );
            }
          })()}
          <TweetShare />
        </Grid>
      </Container>
    </div >
  );
}

export default App;
