import {capitalize, addTask, removeTask} from './helper';

const INITIAL_TASK = [
  {id:'1', complete:false, task:'Go for a walk', user_input:false},
  {id:'2', complete:true, task:'Cook lunch', user_input:false},
  {id:'3', complete:false, task:'Feed the dog', user_input:false},
];
const GET_MILK ={id:'4', complete:false, task:'Pick-up milk', user_input:false};
const COMPLETE_COOK ={id:'2', complete:true, task:'Cook lunch', user_input:false};

describe('capitalize()', ()=>{
  test('Capitalize: apples are great',()=>{
    expect(capitalize('apples are great')).toBe('Apples are great');
  });
  test('Capitalize: walking to the park',()=>{
    expect(capitalize('walking to the park')).not.toBe('walking to the park');
  });
})


describe('addTask()',()=>{
  test('Add first task: Pick-up milk', ()=>{
    expect(addTask([],GET_MILK)).toEqual([GET_MILK]);
  })
  test('Add new task: Pick-up milk', ()=>{
    let addMilk = [...INITIAL_TASK,GET_MILK];
    expect(addTask(INITIAL_TASK,GET_MILK)).toEqual(addMilk);
  })
  test('Update existing task: Cook lunch', ()=>{
    let updatedLunch = INITIAL_TASK;
    updatedLunch[2] = COMPLETE_COOK;
    expect(addTask(INITIAL_TASK,COMPLETE_COOK)).toEqual(updatedLunch);
  })
})

describe('removeTask()',()=>{
  test("Remove first Task", () => {
    expect(removeTask(INITIAL_TASK,INITIAL_TASK[0].id)).not.toContain(INITIAL_TASK[0])
  });
  test("Remove a middle Task", () => {
    expect(removeTask(INITIAL_TASK,INITIAL_TASK[1].id)).not.toContain(INITIAL_TASK[1])
  });
})
