import React from 'react';
import PropTypes from 'prop-types';
import { RgbaColorPicker} from 'react-colorful';

import {stringToRgbaObject, rgbaColorString, debounce} from '../resources/helper';

const ColorSelection = (props) => {
  
  /**
   * @function changeColor
   * @description - Acquires selected color rgba object 
   * @param { object } color - A rgba object { r: 1, g: 2, b:3 , a: 4}
   */
  const changeColor = debounce( (color) =>{
    props.callback(rgbaColorString(color))
  },20)
  
  return (
    <div id={'color-selection'}  >
      <img src={props.src}  alt={props.alt} 
           className={(props.alt.includes('wheel'))? 'wheel': 'letter'} />
      <div className={'color-selector'} >
        <RgbaColorPicker color={stringToRgbaObject(props.color)} onChange={changeColor} />
      </div >
    </div >
  )  
}

ColorSelection.propTypes = {
  /** Sets TaskList color state */
  callback: PropTypes.func.isRequired,
  /** Path to image file */
  src: PropTypes.string,
  /** Image description */
  alt: PropTypes.string,
  /** Color object { r: 1, g: 2, b:3 , a: 4}  */
  color: PropTypes.string,
}

export default ColorSelection;
