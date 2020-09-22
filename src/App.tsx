import React from 'react';
import './App.css';
import Test from './components/test';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import SearchAppBar from './components/appBarWithSearchField';
import PersistentDrawerLeft from './components/PersistentDrawerLeft'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'

function App() {
  return (
    <div className="App">
      <SearchAppBar />
      {/* <Container
        // maxWidth="lg"
        style={{
          backgroundColor: '#cfe8fc'
        }}
      > */}
      {/* <PersistentDrawerLeft /> */}
      <Grid container>
        <Grid item xs={12} lg={4}>
          <Box component="div" m={1}>
            <Typography variant="h4">プロフィール</Typography>
            wikiページから取ってこれたらだいぶ楽しそう
            <Button variant="contained" color="primary">
              Primary
              </Button>
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box component="div" m={1}>
            <Typography variant="h4">特徴的な単語</Typography>
            結構ストップワードの選別がきつかった記憶がある
            <Button variant="contained" color="primary">
              Primary
              </Button>
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box component="div" m={1}>
            <Typography variant="h4">ワードクラウド</Typography>
            ワードクラウドを使えるなら使用したい

            <Button variant="contained" color="primary">
              Primary
              </Button>
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box component="div" m={1}>
            <Typography variant="h4">歌手別類似度</Typography>
            ここが肝心分布図とかなんやかんや利用して類似度を示したい
            分布図とdoc2vecの一覧を示したいよね
            ここは歌手の絞り込みとかを入れたい
            <Button variant="contained" color="primary">
              Primary
              </Button>
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box component="div" m={1}>
            <Typography variant="h4">他のユーザーの検索一覧</Typography>
            おすすめを提示したい
            <Button variant="contained" color="primary">
              Primary
              </Button>
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box component="div" m={1}>
            <Typography variant="h4">検索欄</Typography>
            ただ単純に検索欄というよりは入力が近いときに補完を入れるようにしたい
            複数歌手を入れるとかやるなら結構入れたい。
            できれば引き算(こいつっぽくないほうが嬉しいとか)も
            <Button variant="contained" color="primary">
              Primary
              </Button>
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box component="div" m={1}>
            <Typography variant="h4">ツイッタとの連携</Typography>
            自分のおすすめをツイッターに上げる？
            <Button variant="contained" color="primary">
              Primary
              </Button>
          </Box>
        </Grid>
      </Grid>
      {/* <Test name="えいき" /> */}
      {/* </Container> */}
    </div>
  );
}

export default App;
