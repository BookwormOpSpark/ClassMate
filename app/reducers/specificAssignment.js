const specificAssignment = (state = {}, action) => {
  switch (action.type) {
    case 'GET_ASSIGNMENT':
      return action.payload;
    default:
      return state;
  }
};

export default specificAssignment;
