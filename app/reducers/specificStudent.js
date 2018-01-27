const specificStudent = (state = {}, action) => {
  switch (action.type) {
    case 'GET_STUDENT':
      return action.payload;
    default:
      return state;
  }
};

export default specificStudent;