const badges = (state = [], action) => {
  switch (action.type) {
    case 'GET_BADGES':
      return action.payload;
    default:
      return state;
  }
};

export default badges;
