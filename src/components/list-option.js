import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {Link} from 'react-router-dom'

import { XLg, CheckLg } from 'react-bootstrap-icons';
import { updateTaskList } from '../redux/listSlice'


 class ListOptions extends Component {
  static propTypes = { updateTaskList: PropTypes.func, }

  render() {

    return (
      <div>
        <Link to={'/'} onClick={()=> this.props.updateTaskList('','clear-list')} title={'Add to trash'} >
          <XLg className={'fs-3 text-danger me-2'} title={'Add to trash'} role={'img'} aria-label={'Add to trash'}/>
        </Link >
        <Link to={'/'} onClick={()=> {
          console.log(JSON.stringify(this.props.list));
          this.props.updateTaskList(this.props.list, 'add-list')}} title={'Save list'} >
          <CheckLg className={'fs-3 text-primary ms-2'}  role={'img'} aria-label={'Save list'}/>
        </Link >
      </div>
    )
  }
}


export default connect( null, dispatch => bindActionCreators({ updateTaskList },dispatch)) (ListOptions)
