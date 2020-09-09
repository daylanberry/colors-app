import React, { useState } from 'react';
import PaletteFormNav from './PaletteFormNav';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import arrayMove from 'array-move';
import ColorPickerForm from './ColorPickerForm';
import useStyles from './styles/NewPaletteFormStyles';
import seedColors from './seedColors'


const NewPaletteForm = (props) => {

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [colors, setColors] = useState(seedColors[0].colors || []);

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


  const handleSubmit = (newPalette) => {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-')
    newPalette.colors = colors

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

    var rand = Math.floor(Math.random() * allColors.length);
    let randomColor = allColors[rand]
    let isDuplicateColor = true;

    while (isDuplicateColor) {
      rand = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[rand];
      isDuplicateColor = colors.some(color => color.name === randomColor.name)
    }


    setColors([...colors, randomColor])
  }

  return (
    <div className={classes.root} onClose={props.hideForm}>
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
          distance={20}
        />
      </main>
    </div>
  );

}

export default NewPaletteForm;