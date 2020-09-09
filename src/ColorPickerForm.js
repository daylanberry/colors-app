import React, { useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/ColorPickerFormStyles';

const ColorPickerForm = (props) => {

  const { paletteIsFull, addNewColor, colors, classes } = props;

  const [currentColor, setCurrentColor] = useState('teal');
  const [newColorName, setNewColorName] = useState('');


  useEffect(() => {

    ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
      return colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
    });

    ValidatorForm.addValidationRule('isColorUnique', (value) => {
      return colors.every(({ color }) => color !== currentColor)
    });
  }, [currentColor, colors]);


  const updateCurrentColor = (newColor) => {
    setCurrentColor(newColor.hex)
  }

  const handleChange = (e) => {
    setNewColorName(e.target.value)
  }

  const handleSubmit = () => {
    const newColor = {
      color: currentColor,
      name: newColorName
    };

    addNewColor(newColor)
    setNewColorName('');
  }

  return (
    <div>
      <ChromePicker
          color={currentColor}
          onChangeComplete={(newColor) => updateCurrentColor(newColor)}
          className={classes.picker}
        />
        <ValidatorForm onSubmit={handleSubmit} instantValidate={false}>
          <TextValidator
            value={newColorName}
            variant='filled'
            margin='normal'
            onChange={handleChange}
            className={classes.colorNameInput}
            placeholder='Color Name'
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={['This field is required', 'Name must be unique', 'Color already used!']}
          />
          <Button
            variant='contained'
            type='submit'
            color='primary'
            disabled={paletteIsFull}
            className={classes.addColor}
            style={{backgroundColor: paletteIsFull ? 'grey' : currentColor}}
          >
            {paletteIsFull ? "Palette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
    </div>
  )

}

export default withStyles(styles)(ColorPickerForm);