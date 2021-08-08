import taskSelection from './todo-sample'

export const INITIAL_AUTHORED_LIST = {
 id: '',
 title: '',
 creation_date: '',
 task_list: [],
 list_color: '',
 font_color: '',
};

/**
 * @function capitalize
 * @description This function takes a string an return a a string with the first letter capitalized.
 * @param {string} aString  The string to be capitalized
 * @return {string} A capitalized string
 */
export const capitalize = aString => {
  return (aString.length > 0) ?
    (aString[0].toUpperCase() + aString.slice(1, )) : aString
}

/**
 * @function addTask
 * @description This function add or update an existing task list with a task.
 * @param {object[]} taskList - A collection of tasks objects.
 * @param {object} task - A task object containing id, complete and task.
 * @return {object[]} An updated list with added task.
 */
export const addTask = (taskList, aTask) => {
  let task_to_add = aTask
  let dupilcate = false
  let list;

  if (taskList.length >= 1) {
    list = taskList.map((item) => {
      if (item.id === task_to_add.id) {
        dupilcate = true;
        return task_to_add;
      } else {
        return item
      }
    })
    if (dupilcate === false) {
      list.push(task_to_add)
    }
  } else {
    list = [task_to_add]
  }
  return list
}

/**
 * @function removeTask
 * @description This function remove a task with the given task id.
 * @param {object[]} taskList A collection of tasks objects.
 * @param {string} taskId -The id of the task to be removed.
 * @return {object[]} An updated list with added task.
 */
export const removeTask = (taskList, taskId) => {
  return taskList.filter((item) => {
    return item.id !== taskId
  })
}

/**
* @function rgbaColorString
* @description This function converts a rgba object to a string rgba value
* @param {object} color - An object with keys (a, g, b, a) with corresponding number values.
* @return {string} - A CSS rgba value in the form of a string "rgba( 2, 3, 4, 0.8)"
*/
export const rgbaColorString = color => {
    let opacity = (Object.is(color.a, NaN) || Object.is(color.a, null))? 0: color.a;
    return `rgba( ${color.r} , ${color.g} , ${color.b} , ${opacity} )`
  }

/**
* @function stringToRgbaObject
* @description This function converts a string rgba value to a rgba object
* @param {string} color - A CSS rgba value in the form of a string "rgba( 2, 3, 4, 0.8)"
* @return {object} - An object with keys (a, g, b, a) with corresponding number values.
*/
export const stringToRgbaObject = color =>{
  let colorArray = color.split(' ')
  return ({r:colorArray[1], g:colorArray[3], b:colorArray[5], a:colorArray[7]})
}

/**
 * 
 * @param { array } list - Array of objects with 'id' key and unquie value 
 * @param { object } value - Object with 'id' key and unquie value 
 * @param { string } option - A string either 'add-list' or 'delete-list'
 * @returns Array of objects with 'id' key and unquie value 
 */
export const updateCollection = (list, value, option) =>{
  let collection;

  if(option === 'add-list'){
    let duplicate = false;
    collection = list.map((item, i) => {
      if(item.id === value.id){
        duplicate = true;
        return value
      }else{ return item;}
    });
    if(!duplicate) collection.push(value)
  }
  else if (option === 'delete-list') {
    collection = removeTask(list, value)
  }
  localStorage.setItem('task-collection', JSON.stringify(collection));
  return collection;
}

/**
 * 
 * @returns Array with LocalStorage data 
 */
export const initializeCollection = () =>{
  let collection = JSON.parse(localStorage.getItem('task-collection'))  
  return (collection && collection.length > 0 )? collection: taskSelection;
}

/**
 * 
 * @param { function } callback Function for bouncing reduction
 * @param { number } delay - Milliseconds to prevent the callback from firing
 * @returns 
 */
export const debounce = (callback, delay) => {
  let timer 
  return (...args) =>{
    clearTimeout(timer)
    timer = setTimeout(()=> callback (...args),delay)
  }
}