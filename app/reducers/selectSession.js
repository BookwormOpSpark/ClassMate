const selectSession = (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_SESSION':
      return action.payload;
    default:
      return state;
  }
};

export default selectSession;
