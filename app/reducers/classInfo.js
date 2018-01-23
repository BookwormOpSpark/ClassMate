const classInfo = (state = {}, action) => {
  switch (action.type) {
    case 'GET_CLASS_INFO':
      return action.payload;
    default:
      return state;
  }
};

export default classInfo;
