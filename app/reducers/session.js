const session = (state = {}, action) => {
  switch (action.type) {
    case 'GET_SESSION':
      return action.payload;
    default:
      return state;
  }
};

export default session;
// const todos = (state = [], action) => {
//   switch (action.type) {
//     case 'ADD_TODO':
//       return [
//         ...state,
//         {
//           id: action.id,
//           text: action.text,
//           completed: false
//         }
//       ]
// You are noe enrolled in class lenght - 1 //JOIN CLASS