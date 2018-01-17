export const getUser = user => ({
  type: 'GET_USER',
  payload: user,
});

export const getSession = session => ({
  type: 'GET_SESSION',
  payload: session,
});

export const getHomeworks = homeworks => ({
  type: 'GET_HOMEWORKS',
  payload: homeworks,
});

export const getBadges = badges => ({
  type: 'GET_BADGES',
  payload: badges,
});

export const logOut = () => ({
  type: 'USER_LOGOUT',
});
