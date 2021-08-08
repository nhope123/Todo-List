import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import CreateList from './CreateList'

const Header = (props) => {

  return (
    <header className={'container-fluid mx-0 py-4 '}       >
      <div className={' container-lg  d-block position-relative'}>
        <div role={'document'} aria-label={'Application header'} title={'Home'}
            className={'col-12 d-flex flex-row justify-content-center align-items-canter'} >

          {/* Company label */}
          <h2 className={'mb-0'}>{'Todo Manager'}</h2>
          
        </div >

        {/* Create list button */}
        { props.componentTransition && <CreateList />  }

      </div>
    </header>
  )
  
}

const mapStateToProps = (state) =>{
  return {
    componentTransition: state.todolist.isButtonVisible,
  }
}

Header.prototype = {
  /** Assign component for display */
  componentTransition: PropTypes.bool,
}

export default connect(mapStateToProps) (Header)
