import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
    }),
);

interface Props {
    frequencyWordList: {
        id: number;
        text: string;
        value: number;
        songs: Array<string>;
    }[];
}

// interface frequencyWordList {
//     text: string;
//     value: number;
//     songs: any;
// }

const ControlledAccordions: React.FC<Props> = ({ frequencyWordList }) => {
    // console.log(frequencyWordList[1].songs);

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    var listItems = frequencyWordList.map((item) =>
        <Accordion expanded={expanded === 'panel' + item.id} onChange={handleChange('panel' + item.id)} key={item.text}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <Typography className={classes.heading}>{item.text}</Typography>
                <Typography className={classes.secondaryHeading}>{item.value}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {/* <Typography> */}
                <ul>
                    {
                        (() => {
                            const songs = item.songs
                            if (songs.length !== 0) {
                                var liItem = songs.map((song) =>
                                    <li key={song}>{song}</li>
                                )
                                // return (<p></p>)
                                return liItem
                            }

                        })()
                    }
                </ul>
                {/* </Typography> */}
            </AccordionDetails>
        </Accordion>
    );

    return (
        <div className={classes.root}>
            {listItems}
            {/* <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography className={classes.heading}>Users</Typography>
                    <Typography className={classes.secondaryHeading}>
                        You are currently not an owner
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
                        diam eros in elit. Pellentesque convallis laoreet laoreet.
                    </Typography>
                </AccordionDetails>
            </Accordion> */}

        </div>
    );
}

export default ControlledAccordions;