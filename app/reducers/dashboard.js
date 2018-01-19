const dashboard = (state = {}, action) => {
  switch (action.type) {
    case 'GET_DASHBOARD':
      return action.payload;
    default:
      return state;
  }
};

export default dashboard;
