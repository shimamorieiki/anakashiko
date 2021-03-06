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
import FrequencyWordcloudAndList from './components/FrequencyWordcloudAndList';
import SingerProfile from './components/SingerProfile';
import SingerAutoCompletion from './components/SingerAutoCompletion';
import IconButton from '@material-ui/core/IconButton';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import axios from 'axios';
// import NestedList from './components/NestedList'
// import ControlledAccordion from './components/ControlledAccordion';
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
interface alikeSingersProperties {
  id: number;
  name: string;
  similarity: number;
  first: number;
  second: number;
}

interface autoCompletionProperties {
  id: number;
  name: string;
}

// type resembleSingersValuesProps = {
//   resembleSingersValues: {
//     value: string,
//   }[]
// }
function App() {

  // const [inputValue, setInputValue] = useState('');
  const [singerValue, setSingerValue] = useState('')
  const [singersInfoValue, setSingersInfoValue] = useState<alikeSingersProperties[]>([]);
  const [autoCompletionValue, setAutoCompletionValue] = useState<autoCompletionProperties[]>([]);
  const [num, setNum] = useState(5)




  // const addresembleSingersValue = (singer: string) => {
  //   setResembleSingersValue([
  //     ...resembleSingersValues,
  //     {
  //       value: singer
  //     }
  //   ]);
  // };

  const handleInputValue = (value: string) => {
    if (value !== "") {

      const sampleApiURL = 'https://jsondata.okiba.me/v1/json/9rmZU200926060103';
      var autoCompletionList: any = [];
      axios
        .get(sampleApiURL)
        .then((results) => {
          for (let i = 0; i < results.data[0].num; i++) {
            autoCompletionList.push({
              id: results.data[2].alikeSingers[i].id,
              name: results.data[2].alikeSingers[i].name,
            });
          }
          if (singerValue !== "") {
            setSingerValue('');
          }

          if (singersInfoValue.length !== 0) {
            setSingersInfoValue([]);
          }

          setAutoCompletionValue(autoCompletionList)
          autoCompletionList = [];


        }).catch(() => {
          console.log("????????????");

        });
    } else {
      setAutoCompletionValue([])
    }

  }

  const handleAddSinger = (value: string) => {
    const sampleApiURL = 'https://jsondata.okiba.me/v1/json/6zYKL200924074420';
    var singersList: any = [];
    axios
      .get(sampleApiURL)
      .then((results) => {
        for (let i = 0; i < num; i++) {
          singersList.push({
            id: results.data[i].id,
            name: results.data[i].name,
            similarity: results.data[i].similarity,
            first: results.data[i].first,
            second: results.data[i].second
          });
          // console.log(results.data[i].id);
        }

        // if (inputValue === "") {
        //   setInputValue('');
        // }

        if (autoCompletionValue.length !== 0) {
          setAutoCompletionValue([])
        }

        setSingersInfoValue(singersList)
        setSingerValue(value);

      }).catch(() => {
        console.log("????????????");

      });

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
          {/* <Grid item lg={12}>
            <LabelBottomNavigation />
          </Grid> */}

          <Grid item xs={12} lg={12}>
            <Box component="div">
              {/* <Typography variant="h4">?????????</Typography> */}
              <FormControl>
                <InputLabel htmlFor="input-with-icon-adornment">
                  ??????????????????
                   {/* ?????????????????????????????????????????????????????????????????????????????????????????????
                   ????????????????????????????????????????????????????????????????????????
                   ??????????????????????????????????????????????????????????????????????????????????????????????????? */}
                </InputLabel>
                <Input
                  id="input-with-icon-adornment"
                  // value={inputValue}
                  placeholder="???:???????????????"
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
                autoCompletionValue={autoCompletionValue}
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
                    <FrequencyWordcloudAndList singer={singerValue} />
                  </Grid>
                  <Grid item xs={12} lg={12}>
                    <Typography variant="h4">??????????????????</Typography>
                    <Typography variant="h6">{singerValue}?????????????????????</Typography>
                    <IconButton>
                      <AnnouncementIcon color="secondary" />
                    </IconButton>
                    {/* ????????????+??????????????????????????????
                      ???-??????????????????????????????????????????
                      ?????????????????????????????????????????????????????????????????? */}
                    <SimilaritySinger singers={singersInfoValue} />
                    <SingerSimilarityScatterChart alikeSingers={singersInfoValue} />
                  </Grid>
                </Box>
              )
            } else {
              return (
                <Grid item xs={12} lg={12}>
                  <Box component="div" m={1}>
                    <LabelBottomNavigation />
                  </Box>
                </Grid>
              );
            }
          })()}
          {/* <TweetShare /> */}
        </Grid>
      </Container>
    </div >
  );
}

export default App;
