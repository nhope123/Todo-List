import React from 'react'
import {Linkedin, Github} from 'react-bootstrap-icons';

function Footer() {
  return (
    <footer className={'container-fluid mx-0 border border-primary '}>
      <div className={'container-lg'}>

        <div className={'d-flex flex-row justify-content-around align-items-center'} >
          <div >
            <a href={'https://github.com/nhope123/todo-list'} target={'_top'} tabIndex={'0'}>Code Repo</a >
          </div >
          <div >
            <a href={'https://www.linkedin.com/in/nialhope/'} target={'_top'} tabIndex={'0'}>
              <Linkedin className={'fs-6'} />
              {/*<i style={{'width':'24', 'color': 'blue'}}
              className={"bi bi-linkedin"} role={'img'} aria-hidden="true" aria-label={'Go to Linkedin profile'}></i> */}
            </a >
            <a href={''} target={'_top'} tabIndex={'0'}>
              <Github  />
              {/*<i className={"bi bi-github fs-1"} role={'img'} aria-label={'Go to Github repository'}></i>*/}
            </a >
          </div >
        </div >

        <div className={'d-flex flex-row justify-content-center align-items-center'} >
          <div id={'copyright'} className={'py-1'} >
            {'nhope'} &copy; {'2021'}
          </div >
        </div >

      </div >
    </footer >
  )
}

export default Footer
