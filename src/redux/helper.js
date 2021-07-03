/**
 * @function capitalize
 * @description This function takes a string an return a a string with the first
 * letter capitalized.
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
