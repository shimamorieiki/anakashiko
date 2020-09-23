import React from 'react';
// import './App.css';
import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
import TwitterIcon from '@material-ui/icons/Twitter';

function TweetShareButton() {
    return (
        <Box component="div" m={1}>
            <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" data-show-count="false">
                <Fab color="primary" aria-label="add">
                    <TwitterIcon />
                </Fab>
            </a>
            <script async src="https://platform.twitter.com/widgets.js">
            </script>
        </Box>
    )
}

export default TweetShareButton;