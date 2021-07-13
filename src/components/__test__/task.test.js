import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
//import { act } from 'react-dom/test-utils';

import Task from '../task';

let haveTask = {id:'3', complete:false, task:'Buy food', user_input:true, callback: ()=>{},
new_input: true}
let emptyTask = {id:'3', complete:false, task:'', user_input:true, callback: ()=>{},
new_input: true}

describe('Task Component', function () {

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

    test("Input testing", () => {
      let taskProps = {id:'3', complete:false, task:'', user_input:true,
                       callback: ()=>{}, new_input: true};

      render(<Task {...taskProps} />)
      expect(screen.getByRole('textbox',{name: 'Input task'})).toBeInTheDocument();
    });

  });

  describe('Delete testing ', function () {

    // Delete button invisible when task value is an empty string
    test("Delete button is invisible", () => {
      render(<Task {...emptyTask} />)
      expect(screen.getByTestId('delete-task')).toHaveStyle({visibility: 'hidden'});
      expect(()=>screen.getByRole('button',{name: 'Delete task'})).toThrow();
    });

    // Delete button visible when task value contains atleast a char
    test("Delete button is visible", () => {
      render(<Task {...haveTask} />)
      expect(screen.getByRole('button',{name: 'Delete task'})).toBeInTheDocument();
      expect(screen.getByTestId('delete-task')).toHaveStyle({visibility: 'visible'});
    });

    test("Delete button onClick event", async () => {

      const mockFunc = jest.fn();
      const props = Object.assign({},haveTask,{callback: mockFunc,new_input:false})
      render(<Task {...props} />);
      userEvent.click(screen.getByRole('button',{name: 'Delete task'}));
      expect(mockFunc).toHaveBeenCalledTimes(1)
      userEvent.click(screen.getByRole('button',{name: 'Delete task'}));
      expect(mockFunc).toHaveBeenCalledTimes(2)
      expect(screen.getByRole('button',{name: 'Delete task'})).toBeInTheDocument();
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
