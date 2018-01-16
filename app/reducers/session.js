const session = (state = {}, action) => {
  switch (action.type) {
    case 'GET_SESSION':
      return action.payload;
    default:
      return state;
  }
};

export default session;
