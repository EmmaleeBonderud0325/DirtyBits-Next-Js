import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsArray(props) {
  const [chipData, setChipData] = React.useState(props.value);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.id !== chipToDelete.id));
};

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {chipData.map((data) => {
        let icon;

        return (
          <ListItem key={data.id}>
            <Chip
            color="warning"
              icon={icon}
              label={data.name}
              onDelete={handleDelete(data)}
              onClick={() => console.log('You clicked the Chip.')}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
}
