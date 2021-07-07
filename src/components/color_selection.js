import React from 'react';
import PropTypes from 'prop-types';
import colorwheel from '../resources/colorwheel3.png';


export default function ColorSelection(props) {
  return (
    <div id={'color-selection'} className={'   '} >
      <img src={colorwheel}  alt={'Colorwheel with 6 different colors'} />
      <div >
        <div className={'color-block'} onClick={()=> props.callback()} ></div>

      </div >
    </div >
  )
}

ColorSelection.propTypes = {
  callback: PropTypes.func.isRequired,
}
