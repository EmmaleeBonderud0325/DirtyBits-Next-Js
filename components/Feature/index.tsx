import React from 'react';
import {
  ThemeIcon,
  Text,
  Title,
  Container,
  SimpleGrid,
  useMantineTheme,
  createStyles,
} from '@mantine/core';
import { colors } from 'constants/colors';
import { GiLightningShield } from "react-icons/gi";
import { FaBlog } from 'react-icons/fa';
import { MdLeaderboard } from 'react-icons/md';
import { FiLayers } from 'react-icons/fi';


const MOCKDATA = [
  {
  "icon": <GiLightningShield style={{width: 30, height: 30}}/>,
  "gradientFrom": "#D84CB5",
  "gradientTo": "#6C64F2",
  "title": "Fast Judge Server",
  "description": "Every once in a while, you’ll see a Golbat that’s missing some fangs. This happens when hunger drives it to try biting a Steel-type Pokémon."
  },
  {
  "icon": <FaBlog style={{width: 30, height: 30}}/>,
  "gradientFrom": "#D24B0C",
  "gradientTo": "#F16B8D",
  "title": "Create your Blog",
  "description": "Every once in a while, you’ll see a Golbat that’s missing some fangs. This happens when hunger drives it to try biting a Steel-type Pokémon."
  },
  {
  "icon": <MdLeaderboard style={{width: 30, height: 30}}/>,
  "gradientFrom": "#38D371",
  "gradientTo": "#9FE963",
  "title": "Leaderboard",
  "description": "Every once in a while, you’ll see a Golbat that’s missing some fangs. This happens when hunger drives it to try biting a Steel-type Pokémon."
  },
  {
  "icon": <FiLayers style={{width: 30, height: 30}}/>,
  "title": "Add Problems",
  "description": "Every once in a while, you’ll see a Golbat that’s missing some fangs. This happens when hunger drives it to try biting a Steel-type Pokémon."
  },
]

function Feature({ icon: Icon, title, description, gradientFrom, gradientTo }) {
  const theme = useMantineTheme();
  return (
    <div>
      <ThemeIcon variant="gradient" gradient={{ from: gradientFrom, to: gradientTo, deg: 40 }} size={80} radius={40}>
        {/* <Icon style={{ width: 20, height: 20 }} /> */}
        {Icon}
      </ThemeIcon>
      <Text variant='text' color="#fff" style={{ marginTop: theme.spacing.sm, marginBottom: 7 }}>{title}</Text>
      <Text className='tracking-wider' size="sm" color="dimmed" style={{ lineHeight: 1.6 }}>
        {description}
      </Text>
    </div>
  );
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
    // marginTop: theme.spacing.xl * 16,
    '@media (max-width: 480px)': {
      textAlign: 'center',
      marginTop: theme.spacing.xl * 8,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
    [theme.fn.smallerThan('sm')]: {
      textAlign: 'left',
    },
    color: colors.primary,
    '@media (max-width: 480px)': {
      textAlign: 'center',
    },
    textAlignLast: 'center',
  },

  description: {
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      textAlign: 'left',
    },
    '@media (max-width: 480px)': {
      textAlign: 'center',
    },
    textAlignLast: 'center',
  },
}));


export function FeatureList({ title, description, data = MOCKDATA }) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const features = data.map((feature, index) => <Feature {...feature} key={index} />);

  return (
    <div className='md:p-5'>
      <Container size="xl" className={classes.wrapper}>
        <Title className={classes.title}>
          <div className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl'>
            <span className='text-white text-center'>Some</span> {title}
          </div>
        </Title>

        <Container className='my-10' size={560} p={0}>
          <Text color="dimmed" size="md" className={classes.description}>
            {description}
          </Text>
        </Container>

        <SimpleGrid
          mt={60}
          cols={3}
          spacing={theme.spacing.xl * 2}
          breakpoints={[
            { maxWidth: 980, cols: 2, spacing: 'xl' },
            { maxWidth: 755, cols: 1, spacing: 'xl' },
          ]}
          className='text-center'
        >
          {features}
        </SimpleGrid>
      </Container>
    </div>
  );
}

export default FeatureList;