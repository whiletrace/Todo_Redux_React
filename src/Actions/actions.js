
 import { normalize } from 'normalizr'
 import * as api from '../Api/index'
 import { getIsFetching } from '../redux/RootReducer'
 import * as schema from './schema'

// The actions that are being dispatched

// addTodo is dispatched by AddTodo container module
 export const addTodo = text => dispatch =>
   api.addTodo(text).then((response) => {
     console.log( // eslint-disable-line no-console
      'normalized response',
      normalize(response, schema.todo),
    )
     dispatch({
       type: 'ADD_TODO_SUCCESS',
       response: normalize(response, schema.todo),
     })
   })

// Asnchronous action creator
// resolves promise from api to the action object
// now a function with a callback argument or a thunk
 export const fetchTodos = filter => (dispatch, getState) => {
   if (getIsFetching(getState(), filter)) {
     return Promise.resolve()
   }
   dispatch({
     type: 'FETCH_TODOS_REQUEST',
     filter,
   })

   return api.fetchTodos(filter).then(
     (response) => {
       console.log( // eslint-disable-line no-console
      'normalized response',
      normalize(response, schema.arrayOfTodos),
    )
       dispatch({
         type: 'FETCH_TODOS_SUCCESS',
         response: normalize(response, schema.arrayOfTodos),
         filter,
       })
     },
   (error) => {
     dispatch({
       type: 'FETCH_TODOS_FAILURE',
       filter,
       message: error.message || 'something went wrong',
     })
   },
   )
 }


// toggleTodo action is dispached by VisibleTodoList container module

 export const toggleTodo = id => dispatch =>
  api.toggleTodo(id).then((response) => {
    dispatch({
      type: 'TOGGLE_TODO_SUCCESS',
      response: normalize(response, schema.todo),
    })
  })

