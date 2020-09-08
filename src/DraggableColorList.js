import React from 'react';
import DraggableColorbox from './DraggableColorbox'
import { SortableContainer } from 'react-sortable-hoc';

const DraggableColorList = SortableContainer(({colors, removeColor}) => {
  return (
    <div style={{height: '100%'}}>
      {colors.map((color, i)=> (
          <DraggableColorbox
            index={i}
            key={color.name}
            handleClick={() => removeColor(color.name)}
            color={color.color}
            name={color.name}
          />
        ))}
    </div>
  )
});

export default DraggableColorList