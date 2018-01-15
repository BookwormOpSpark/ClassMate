const homeworks = (state = [], action) => {
  switch (action.type) {
    case 'GET_HOMEWORKS':
      return action.payload;
    default:
      return state;
  }
};

export default homeworks;
