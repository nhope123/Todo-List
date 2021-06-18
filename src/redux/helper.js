
export const capitalize = aString => {
  return (aString.length > 0)?
                    (aString[0].toUpperCase()+ aString.slice(1,)): aString
}


export const addTask = (taskList, aTask) =>{

  let dupilcate = false
  let list;

  if (taskList.length >= 1) {
    list = taskList.map((item) => {
                            if (item.id === aTask.id) {
                              dupilcate = true;
                              return aTask;
                              } else { return item } })
    if (dupilcate === false) { list.push(aTask) }
  } else {
    list = [aTask]
  }





   /*=  ?   : (dupilcate === false)? [...taskList, aTask]:
                                              [aTask]*/

  console.log(`completed-list: ${JSON.stringify(list)}`);
  return list
  //console.log(`item-id: ${item.id},  add-id: ${aTask.id}`);
  /*clearedList.push(aTask)
  return clearedList*/
}
