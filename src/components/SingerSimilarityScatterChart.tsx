
import React from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, LabelList,
} from 'recharts';

interface Props {
    alikeSingers: {
        id: number;
        name: string;
        similarity: number;
        first: number;
        second: number;
    }[]
}

const SingerSimilarityScatterChart: React.FC<Props> = ({ alikeSingers }) => {

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
            <Scatter name="類似歌手" data={alikeSingers} fill="#fffaaa">
                <LabelList dataKey="name" />
            </Scatter>
        </ScatterChart>
    );
}

export default SingerSimilarityScatterChart
