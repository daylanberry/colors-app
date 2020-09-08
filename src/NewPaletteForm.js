import React, { useState } from 'react';
import PaletteFormNav from './PaletteFormNav';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import arrayMove from 'array-move';
import ColorPickerForm from './ColorPickerForm'



const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    display: 'flex',
    alignItems: 'center'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  container: {
    width: '90%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttons: {
    width: '100%',
  },
  button: {
    width: '50%'
  }
}));


const NewPaletteForm = (props) => {

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [colors, setColors] = useState(props.palettes[0].colors);

  // const [newPaletteName, setNewPaletteName] = useState('')

  const paletteIsFull = colors.length >= 20

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addNewColor = (newColor) => {
    setColors([...colors, newColor])
  }

  const onSortEnd = ({oldIndex, newIndex}) => {
    let newColors = arrayMove(colors, oldIndex, newIndex)
    setColors(newColors)
  }


  const handleSubmit = (newPaletteName) => {
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, '-'),
      colors
    }
    props.savePalette(newPalette);
    props.history.push('/')
  }

  const removeColor = (colorName) => {
    let newColors = colors.filter(color => color.name !== colorName)

    setColors(newColors)
  }

  const clearColors = () => {
    setColors([])
  }

  const addRandomColor = () => {

    const allColors = props.palettes.map(p =>p.colors).flat()

    var rand = Math.floor(Math.random() * allColors.length)
    const randomColor = allColors[rand]

    setColors([...colors, randomColor])
  }

  return (
    <div className={classes.root}>
      <PaletteFormNav
        open={open}
        palettes={props.palettes}
        handleDrawerOpen={handleDrawerOpen}
        handleSubmit={handleSubmit}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.container}>
          <Typography variant='h4' gutterBottom>
            Design your palette!
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant='contained'
              color='secondary'
              className={classes.button}
              onClick={clearColors}
            >
              Clear Palette
            </Button>
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
              onClick={addRandomColor}
              disabled={paletteIsFull}
            >
              Random Color
            </Button>
          </div>
          <ColorPickerForm
            paletteIsFull={paletteIsFull}
            addNewColor={addNewColor}
            colors={colors}
          />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          axis='xy'
          onSortEnd={onSortEnd}
        />
      </main>
    </div>
  );

}

export default NewPaletteForm;