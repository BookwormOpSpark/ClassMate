const assignmentCheck = (state = {}, action) => {
  switch (action.type) {
    case 'GET_SPECIFIC_ASSIGNMENT':
      return action.payload;
    default:
      return state;
  }
};

export default assignmentCheck;
