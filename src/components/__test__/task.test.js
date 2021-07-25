import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

    test("Checkbox interaction", async() => {
      let taskProps = Object.assign({}, HAVETASK, {callback: mockFunc,complete:true});

      const {getByRole} = render(<Task {...taskProps} />);

      const checkbox = screen.getByRole('checkbox',{name:'Task completed'})
      // On click check is checked
      userEvent.click(checkbox)
      expect(mockFunc).toHaveBeenCalledTimes(1);
      // On click check is unchecked
      userEvent.click(checkbox)
      expect(mockFunc).toHaveBeenCalledTimes(2);
    });

    test("Checkbox is checked and task input has style line-through", () => {
      let taskProps = Object.assign({},HAVETASK,{complete: true,});
      render(<Task {...taskProps} />)

      // Checkbox is checked
      expect(screen.getByRole('checkbox',{name: 'Task completed'})).toBeChecked();
      // Task value has style line-through
      expect(screen.getByRole('textbox',{name: 'Input task'})).toHaveStyle({'text-decoration': 'line-through'});
      // Task display is not rendered
      expect(()=>screen.getByTestId('input-display')).toThrow();
    });
    test("Checkbox is checked and task display has style line-through", () => {
      let taskProps = Object.assign({},HAVETASK,{complete: true,user_input: false,new_input: false});
      render(<Task {...taskProps} />)

      // Checkbox is checked
      expect(screen.getByRole('checkbox',{name: 'Task completed'})).toBeChecked();
      // Display text has style line-through
      expect(screen.getByRole('document',{name: 'Input display'})).toHaveStyle({'text-decoration': 'line-through'});
      // Task display is visible
      expect(screen.getByRole('document',{name: 'Input display'})).toBeVisible();
      // Task input is not rendered.
      expect(()=>screen.getByRole('textbox',{name: 'Input task'})).toThrow();
    });

    test("Checkbox is unchecked and task input has style line-through", () => {
      let taskProps = Object.assign({},HAVETASK,{complete: false,});
      render(<Task {...taskProps} />)

      // Checkbox is unchecked
      expect(screen.getByRole('checkbox',{name: 'Task completed'})).not.toBeChecked();
      // Task value has style line-through
      expect(screen.getByRole('textbox',{name: 'Input task'})).toHaveStyle({'text-decoration': 'none'});
      // Task display is not rendered
      expect(()=>screen.getByTestId('input-display')).toThrow();
    });
    test("Checkbox is unchecked and task display has style line-through", () => {
      let taskProps = Object.assign({},HAVETASK,{complete: false,user_input: false,new_input: false});
      render(<Task {...taskProps} />)

      // Checkbox is unchecked
      expect(screen.getByRole('checkbox',{name: 'Task completed'})).not.toBeChecked();
      // Display text has style line-through
      expect(screen.getByRole('document',{name: 'Input display'})).toHaveStyle({'text-decoration': 'none'});
      // Task display is visible
      expect(screen.getByRole('document',{name: 'Input display'})).toBeVisible();
      // Task input is not rendered.
      expect(()=>screen.getByRole('textbox',{name: 'Input task'})).toThrow();
    });




  });

  describe('Input testing ', function () {

    test("Input should be empty", () => {
      let taskProps = Object.assign({}, EMPTYTASK, {callback: mockFunc})

      render(<Task {...taskProps} />)
      // Test empty input element is shown
      expect(screen.getByRole('textbox',{name: 'Input task'})).toBeInTheDocument();
      // Test the element for empty string
      expect(screen.getByRole('textbox',{name: 'Input task'})).toHaveTextContent('');
      // Test the input display is not shown
      expect(()=>screen.getByRole('document',{name: 'input-display'})).toThrow();
      // Test for placeholder
      expect(screen.getByPlaceholderText('Task')).toBeInTheDocument();
      // Test that task completion check box is invisible
      expect(screen.getByTestId('task-complete')).not.toBeVisible();
      // Test that task delete button is invisible
      expect(screen.getByTestId('delete-task')).not.toBeVisible();
    });

    test("Input should not be empty with input element", () => {
      let taskProps = Object.assign({}, EMPTYTASK, {callback: mockFunc, task: 'Cook Food'})

      render(<Task {...taskProps} />)
      // Test input element is shown
      expect(screen.getByRole('textbox',{name: 'Input task'})).toBeInTheDocument();
      // Test the element for string content
      expect(screen.getByRole('textbox',{name: 'Input task'})).toHaveValue('Cook Food');
      // Test the input display is not shown
      expect(()=>screen.getByRole('document',{name: 'input-display'})).toThrow();
      // Test for placeholder
      expect(screen.getByPlaceholderText('Task')).toBeInTheDocument();
      // Test that task completion check box is visible
      expect(screen.getByTestId('task-complete')).toBeVisible();
      // Test that task delete button is visible
      expect(screen.getByTestId('delete-task')).toBeVisible();
    });

    test("Input should not be empty with display element", () => {
      let taskProps = Object.assign({}, EMPTYTASK, {callback: mockFunc, task: 'Cook Food', user_input: false,});

      render(<Task {...taskProps} />)
      // Test input element is not shown
      expect(()=>screen.getByRole('textbox',{name: 'Input task'})).toThrow();
      // Test the display element for string content
      expect(screen.getByRole('document',{name: 'Input display'})).toHaveTextContent('Cook Food');
      // Test the input display is not shown
      expect(()=>screen.getByRole('document',{name: 'input-display'})).toThrow();
      // Test for placeholder
      expect(()=>screen.getByPlaceholderText('Task')).toThrow();
      // Test that task completion check box is visible
      expect(screen.getByTestId('task-complete')).toBeVisible();
      // Test that task delete button is visible
      expect(screen.getByTestId('delete-task')).toBeVisible();
    });

  });

  describe('Delete testing ', function () {

    // Delete button invisible when task value is an empty string
    test("Delete button is invisible", () => {
      render(<Task {...EMPTYTASK} />)
      expect(screen.getByTestId('delete-task')).not.toBeVisible();
      expect(()=>screen.getByRole('button',{name: 'Delete task'})).toThrow();
    });

    // Delete button visible when task value contains atleast a char
    test("Delete button is visible", () => {
      render(<Task {...HAVETASK} />)

      expect(screen.getByRole('button',{name: 'Delete task'})).toBeInTheDocument();
      expect(screen.getByTestId('delete-task')).toBeVisible();
    });

    // Delete button Event handling
    test("Delete button onClick event",  () => {
      const props = Object.assign({},HAVETASK,{callback: mockFunc,new_input:false})

      render(<Task {...props} />);

      userEvent.click(screen.getByRole('button',{name: 'Delete task'}));
      expect(mockFunc).toHaveBeenCalledTimes(1)

      userEvent.dblClick(screen.getByRole('button',{name: 'Delete task'}));
      expect(mockFunc).toHaveBeenCalledTimes(3)

      expect(screen.getByRole('button',{name: 'Delete task'})).toBeInTheDocument();
      expect(screen.getByTitle('Delete task')).toBeInTheDocument();
    });

  });


});
