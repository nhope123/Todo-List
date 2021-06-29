import React, { Component } from 'react';
import moment from 'moment';

class TaskList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      creation_date: moment().format('ddd, Do MMMM, YYYY'),
      title: '',
      task_list: [],
    }
  }

  render() {
    return (
      <div>TaskList</div>
    )
  }
}

export default TaskList
