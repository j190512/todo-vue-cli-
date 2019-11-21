export default{
  changeTodoCompleted(state,change){
    // console.log(change)
    for(let todo of state.todos){
      if(todo.id === change.id){
        todo.completed = change.completed
      }
    }
  },
  deleteTodo(state,id){
    state.todos.splice(state.todos.findIndex(todo=>todo.id === id),1)
  },
  delAllTodo(state){
    state.todos = state.todos.filter(todo=>todo.completed == false)
  },
  addTodo(state,obj){
    state.todos.unshift({
      id:Math.floor(new Date()/1000),
      content:obj.content,
      completed:obj.completed
    })
  },
  localUser(state,localTodos){
    state.todos = localTodos
  },
  //将todos上的数据转移到localTodos 上的数据  --->覆盖
  coverLocalTodos(state,LocalTodosId){
    localStorage.setItem(`${LocalTodosId}Todos`,JSON.stringify(state.todos))
  },
  handleFristTimeFlag(state){
    state.fristTimeTodoInit = false
  },
  changeAccount(state,newAccount){
    state.account = newAccount
  }
}
