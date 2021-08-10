import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {Link} from 'react-router-dom'
import { XLg, CheckLg } from 'react-bootstrap-icons';

import { updateTaskList } from '../redux/listSlice'

 const ListOptions = (props) => {

  /**
   * @function submitTaskList
   * @description - Process TaskList component submission
   */
  const submitTaskList = () =>{        
    if (props.list.task_list.length > 0) props.callback(props.list, 'add-list')    
  }

  return (
    <div>
      <Link to={'/'} onClick={()=> props.callback('','clear-list')} title={'Add to trash'} >
        <XLg className={'fs-3 text-danger me-2'} title={'Add to trash'} role={'img'} aria-label={'Add to trash'}/>
      </Link >
      <Link to={'/'} onClick={ submitTaskList } title={'Save list'} >
        <CheckLg className={'fs-3 text-primary ms-2'}  role={'img'} aria-label={'Save list'}/>
      </Link >
    </div>
  )
}

ListOptions.propTypes = { 
  /** Add TaskList component to collection */
  callback: PropTypes.func, 
}

const mapDispatchToProps = dispatch =>{
  return bindActionCreators({ 
    callback: updateTaskList,
  },dispatch)
}

export default connect( null, mapDispatchToProps) (ListOptions)
