import React,{ useEffect} from 'react';
import PropTypes from 'prop-types';
import { RgbaColorPicker} from 'react-colorful';

import {stringToRgbaObject, rgbaColorString, debounce} from '../redux/helper';

/**
 * 
 * @param {object} props - An object containing the keys ( image, alt, color, callback);
 * @param {string} image - A string representaion of 
 * @returns 
 */

const ColorSelection = (props) => {

  const changeColor = debounce( (color) =>{
    props.callback(rgbaColorString(color))
  },20)
  
  return (
    <div id={'color-selection'}  >
      <img src={props.image}  alt={props.alt} 
           className={(props.alt.includes('wheel'))? 'wheel': 'letter'} />
      <div className={'color-selector'} >
        <RgbaColorPicker color={stringToRgbaObject(props.color)} onChange={changeColor} />
      </div >
    </div >
  )
  
}

ColorSelection.propTypes = {
  callback: PropTypes.func.isRequired,
  image: PropTypes.string,
  alt: PropTypes.string,
  color: PropTypes.string,
}

export default ColorSelection;
