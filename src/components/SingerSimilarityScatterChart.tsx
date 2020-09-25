
import React from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, LabelList,
} from 'recharts';

// interface Props {
//     singers: {
//         name: string;
//     }[];
//     recommendtype: string;
// }

// type Props = {
//     suggestType: string;
// }

interface Props {
    singers: {
        id: number;
        name: string;
        similarity: number;
        first: number;
        second: number;
    }[]
}

// const SingerSimilarityScatterChart: React.FC<Props> = ({ suggestType }) => {
const SingerSimilarityScatterChart: React.FC<Props> = ({ singers }) => {
    // const data = [
    //     { x: 100, y: 200, name: "a" },
    //     { x: 120, y: 100, name: "b" },
    //     { x: 170, y: 300, name: "c" },
    //     { x: 140, y: 250, name: "d" },
    //     { x: 150, y: 400, name: "e" },
    //     { x: 110, y: 280, name: "f" },
    // ];

    return (

        <ScatterChart
            width={300}
            height={300}
            margin={{
                top: 20, right: 20, bottom: 20, left: 20,
            }}
        >
            <CartesianGrid />
            <XAxis type="number" dataKey="first" name="stature" />
            <YAxis type="number" dataKey="second" name="weight" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="類似歌手" data={singers} fill="#fffaaa">
                <LabelList dataKey="name" />
            </Scatter>
        </ScatterChart>
    );
}

export default SingerSimilarityScatterChart
