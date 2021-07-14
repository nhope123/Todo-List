import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
//import { act } from 'react-dom/test-utils';

import Task from '../task';

const HAVETASK = {id:'3', complete:false, task:'Buy food', user_input:true,
                  callback: ()=>{}, new_input: true};
const EMPTYTASK = {id:'3', complete:false, task:'', user_input:true,
                   callback: ()=>{}, new_input: true};

describe('Task Component', function () {

  let mockFunc = jest.fn();

  describe('Task container testing', function () {

    test("Empty empty new task testing", () => {
      let taskProps = {id:'3', complete:false, task:'', user_input:false,
                       callback: ()=>{}, new_input: true};

      render(<Task {...taskProps} />)
      expect(screen.getByTestId('task-component')).toBeInTheDocument();
    });

  });

  describe('Form testing ', function () {

    test("Form testing", () => {
      let taskProps = {id:'3', complete:false, task:'', user_input:false,
                       callback: ()=>{}, new_input: true};

      render(<Task {...taskProps} />)
      expect(screen.getByRole('form',{name: 'task-form'})).toBeInTheDocument();
    });

  });

  describe('Checkbox testing ', function () {

    test("Checkbox testing", () => {
      let taskProps = {id:'3', complete:false, task:'', user_input:false,
                       callback: ()=>{}, new_input: true};

      render(<Task {...taskProps} />)
      expect(screen.getByRole('checkbox',{name: 'Task completed'})).toBeInTheDocument();
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
      expect(screen.getByTestId('task-complete')).toHaveStyle({visibility: 'hidden',})
      // Test that task delete button is invisible
      expect(screen.getByTestId('delete-task')).toHaveStyle({visibility: 'hidden',})
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
      // Test that task completion check box is invisible
      expect(screen.getByTestId('task-complete')).toHaveStyle({visibility: 'visible',})
      // Test that task delete button is invisible
      expect(screen.getByTestId('delete-task')).toHaveStyle({visibility: 'visible',})
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
      // Test that task completion check box is invisible
      expect(screen.getByTestId('task-complete')).toHaveStyle({visibility: 'visible',})
      // Test that task delete button is invisible
      expect(screen.getByTestId('delete-task')).toHaveStyle({visibility: 'visible',})
    });

    test("Input change", () => {
      let taskProps = Object.assign({}, EMPTYTASK, {callback: mockFunc, task: 'Cook Food',});

      render(<Task {...taskProps} />)
      const input = screen.getByTestId('Input task');
      input.setSelectionRange(0,4);
      userEvent.type(input,'{del}Eat')
      console.log(input.value);
      // Test Adding text to input
      expect(input).toHaveDisplayValue('Eat Food');
    });

  });

  describe('Delete testing ', function () {

    // Delete button invisible when task value is an empty string
    test("Delete button is invisible", () => {
      render(<Task {...EMPTYTASK} />)
      expect(screen.getByTestId('delete-task')).toHaveStyle({visibility: 'hidden'});
      expect(()=>screen.getByRole('button',{name: 'Delete task'})).toThrow();
    });

    // Delete button visible when task value contains atleast a char
    test("Delete button is visible", () => {
      render(<Task {...HAVETASK} />)

      expect(screen.getByRole('button',{name: 'Delete task'})).toBeInTheDocument();
      expect(screen.getByTestId('delete-task')).toHaveStyle({visibility: 'visible'});
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



/*
let container = null;

beforeEach(()=>{
  // Setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(()=>{
  // Cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
})

describe('Task Component',()=>{

  // Testing the Component props
  describe('Task Props testing', function () {

    it('Props testing: string task',()=>{
      act(()=>{
        let taskProps = {id:'3', complete:false, task:'Feed the dog', user_input:false, callback: ()=>{},
        new_input: true}
        render(<Task {...taskProps} />,container);
      });
      expect(container.textContent).toContain('Feed the dog');
    });

    it('Props testing: empty string task',()=>{
      act(()=>{
        let taskProps = {id:'6', complete:false, task:'', user_input:false, callback: ()=>{},
        new_input: true}
        render(<Task {...taskProps} />,container);
      });
      expect(container.textContent).toContain('');
    });

  });

  describe('Element Testing', function () {
    let props = {id:'6', complete:false, task:'Food', user_input:false, callback: ()=>{},
    new_input: true}

    test("Task should render", () => {
      act(()=>{
        render(<Task {...props} />,container);
      });
      console.log(container.querySelector(`[data-test='Task Component']`).textContent);
      expect(container.querySelector(`[data-test='Task Component']`))

    });


  });


})
*/
