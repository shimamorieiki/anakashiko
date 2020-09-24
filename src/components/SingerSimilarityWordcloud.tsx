
import React from 'react';
import ReactWordcloud from 'react-wordcloud';

// interface Props {
//     singers: {
//         name: string;
//     }[];
//     recommendtype: string;
// }

// type Props = {
//     suggestType: string;
// }

// const SingerSimilarityScatterChart: React.FC<Props> = ({ suggestType }) => {
const SingerSimilarityWordcloud = () => {
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
    return (

        <ReactWordcloud words={words} />
    );
}

export default SingerSimilarityWordcloud
