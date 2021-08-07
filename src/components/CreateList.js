import { bindActionCreators } from '@reduxjs/toolkit'
import React from 'react'
import { connect } from 'react-redux'
import { editTaskList, } from '../redux/listSlice'
import { INITIAL_AUTHORED_LIST } from '../redux/helper'
import {Link} from 'react-router-dom'
import { PlusCircleFill } from 'react-bootstrap-icons'

const CreateList = (props) => {
    return (
        <Link to={'/create-list'} onClick={()=> props.editTaskList(INITIAL_AUTHORED_LIST)}   >
            <span role={'alert'} aria-label={'Create new list button '} ></span>
            <button type={'button'} tabIndex={'0'} className={'create-list-button p-0'} >
              <PlusCircleFill className={'fs-1 m-0 p-0'} role={'img'} aria-label={'Create a new Todo list'}  />
            </button >
        </Link >
    )
}

const mapDispatchToProps = dispatch =>{
    return bindActionCreators({
      editTaskList,
    },dispatch)
  }

export default connect(null, mapDispatchToProps) (CreateList)
