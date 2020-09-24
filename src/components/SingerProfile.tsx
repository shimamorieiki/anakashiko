import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


// interface Props {
//     singers: {
//         name: string;
//     }[];
//     recommendtype: string;
// }

type Props = {
    name: string;
}

const SingerProfile: React.FC<Props> = ({ name }) => {

    const encodedURL: string = "https://ja.wikipedia.org/wiki/" + encodeURI(name)
    // ZONEのように複数候補があるときの検索よけは多分必要
    //本来だったら「もっと見る」みたいなので移動できると便利？
    return (
        <Box component="div">
            <Typography variant="h3">{name}</Typography>
            <Typography variant="h4">プロフィール</Typography>
            <Typography variant="h6">
                <a href={encodedURL} target="_blank">wikipedia</a>
            </Typography>
        </Box>
    );
}

export default SingerProfile