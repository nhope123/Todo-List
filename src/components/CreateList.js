import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from '@reduxjs/toolkit'
import { PlusCircleFill } from 'react-bootstrap-icons'

import { editTaskList, } from '../redux/listSlice'
import { INITIAL_AUTHORED_LIST } from '../resources/helper'


const CreateList = (props) => {
  return (
    <Link to={'/create-list'} onClick={()=> props.callback(INITIAL_AUTHORED_LIST)}   >
        <span role={'alert'} aria-label={'Create new list button '} ></span>
        <button type={'button'} tabIndex={'0'} className={'create-list-button p-0'} >
          <PlusCircleFill className={'fs-1 m-0 p-0'} role={'img'} aria-label={'Create a new Todo list'}  />
        </button >
    </Link >
  )
}

const mapDispatchToProps = dispatch =>{
  return bindActionCreators({
    callback: editTaskList,
  },dispatch)
}

CreateList.prototype = {
  /** Sets TaskList componnent states */
  callback: PropTypes.func,
}

export default connect(null, mapDispatchToProps) (CreateList)
