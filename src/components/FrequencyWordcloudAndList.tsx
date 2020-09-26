import React, { useState } from 'react';
import ReactWordcloud from 'react-wordcloud';
import axios from 'axios';
import { Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ReplayIcon from '@material-ui/icons/Replay';
import ControlledAccordion from './ControlledAccordion';
import Typography from '@material-ui/core/Typography';

interface Props {
    singer: string;
}

interface wordcloudProperties {
    id: number;
    text: string;
    value: number;
    songs: any;
}

const FrequencyWordcloudAndList: React.FC<Props> = ({ singer }) => {
    const [wordcloudValue, setWordcloudValue] = useState<wordcloudProperties[]>([]);
    const sampleApiURL = 'https://jsondata.okiba.me/v1/json/cZKV2200926144710';
    var wordsList: any = [];
    if (wordcloudValue.length === 0) {
        axios
            .get(sampleApiURL)
            .then((results) => {
                for (let i = 0; i < 2; i++) {
                    // wordcroudList.push({
                    //     text: results.data[2].words[i].word,
                    //     value: results.data[2].words[i].score,
                    // });
                    wordsList.push({
                        id: results.data[2].words[i].id,
                        text: results.data[2].words[i].word,
                        value: results.data[2].words[i].score,
                        songs: results.data[2].words[i].songs,
                    })
                    // console.log(results.data[i].id);
                }
                setWordcloudValue(wordsList)
            }).catch(() => {
                console.log("失敗した");

            });
    }

    // var FrequencyWordList = wordcloudValue.map((item) =>
    //     <Box component="div" key={item.text}>
    //         <ControlledAccordion />
    //         {item.text} {item.songs[0]} {item.songs[1]}
    //     </Box>
    // )

    return (
        <Box component="div">
            {
                (() => {
                    if (wordcloudValue.length !== 0) {
                        return (
                            <Box component="div">
                                <Typography variant="h4">特徴的な単語</Typography>
                                <ControlledAccordion frequencyWordList={wordcloudValue} />
                                <Typography variant="h4">ワードクラウド</Typography>
                                <ReactWordcloud words={wordcloudValue} />
                            </Box>
                        )
                    }
                })()
            }
        </Box>
    );
}

export default FrequencyWordcloudAndList
