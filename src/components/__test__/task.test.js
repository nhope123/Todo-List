import React from 'react';
import { render, screen, fireEvent, getRoles } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Task from '../task';

const HAVETASK = {id:'3', complete:false, task:'Buy food', user_input:true,
                  callback: ()=>{}, new_input: true};
const EMPTYTASK = {id:'3', complete:false, task:'', user_input:true,
                   callback: ()=>{}, new_input: true};

describe('Task Component', function () {

  let mockFunc = jest.fn();

  describe('Task container testing', function () {
    let taskProps = Object.assign({},EMPTYTASK,{user_input:false});

    test("Should have task container", () => {
      render(<Task {...taskProps} />)
      expect(screen.getByTestId('task-component')).toBeInTheDocument();
    });

  });

  describe('Form testing ', function () {

    test("Form testing", () => {
      let taskProps = {id:'3', complete:false, task:'', user_input:false,
                       callback: ()=>{}, new_input: true};

      render(<Task {...taskProps} />)
      // Test if form exist
      expect(screen.getByRole('form',{name: 'task-form'})).toBeInTheDocument();
    });

  });

  describe('Checkbox testing ', function () {

    test("Checkbox Clicked", async() => {
      let taskProps = Object.assign({}, HAVETASK, {callback: mockFunc,complete:true});

      const {getByRole} = render(<Task {...taskProps} />);

      const checkbox = screen.getByRole('button',{name:'Completed task'})
      
      userEvent.click(checkbox)
      expect(mockFunc).toHaveBeenCalledTimes(1);
      userEvent.click(checkbox)
      expect(mockFunc).toHaveBeenCalledTimes(2);
    });

    test("Checkbox is checked and task input has style line-through", () => {
      let taskProps = Object.assign({},HAVETASK,{complete: true,});
      render(<Task {...taskProps} />)
      const checkbox = screen.getByRole('button',{name:'Completed task'})

      // Box checked
      expect(screen.getByTestId('checked')).toBeInTheDocument()
      
    });
  });

});