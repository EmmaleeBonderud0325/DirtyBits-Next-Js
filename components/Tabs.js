import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({questionData}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', height:'100vh' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} textColor="inherit" indicatorColor="secondary" onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Problem" {...a11yProps(0)} />
          <Tab label="Submissions" {...a11yProps(1)} />
          <Tab label="Discussion" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className="space-y-5 transition-all ease-in-out">
          {/* PROBLEM DIFFICULTY */}
          <p className="bg-green-600 inline px-3 py-1 rounded-xl ">Easy</p>
          {/* PROBLEM TITLE */}
        <p className="font-medium text-lg text-[#a1acc0]">
          <span>1. </span>{questionData.title}
        </p>
          {/* PROBLEM DESCRIPTION */}
          <p className="text-[#57647C] leading-8">
            {questionData.problem_statement} 
          </p>

          <div className="text-white select-none">
            {/* SAMPLE TEST CASES INPUT */}
            <h3 className="text-white font-semibold">Sample Test Cases</h3>
            <h2 className="text-[#57647C]">Input</h2>
            <p className="text-[#57647C]">1) fasd</p>
            <p className="text-[#57647C]">2) 1231</p>

            {/* SAMPLE OUTPUT */}
            <h3 className="text-white font-semibold">Sample Test Cases</h3>
            <h2 className="text-[#57647C]">Output</h2>
            <p className="text-[#57647C]">1) fasd</p>
            <p className="text-[#57647C]"> 2) 1231</p>
          </div>
        </div>
        
      </TabPanel>
      <TabPanel value={value} index={1}>
        Submissions
      </TabPanel>
      <TabPanel value={value} index={2}>
        Discussion  
      </TabPanel>
    </Box>
  );
}
