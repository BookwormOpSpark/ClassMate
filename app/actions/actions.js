export const getUser = user => ({
  type: 'GET_USER',
  payload: {
    user,
  },
});

export const getHomeworks = homeworks => ({
  type: 'GET_HOMEWORKS',
  payload: {
    homeworks,
  },
});

export const getBadges = badges => ({
  type: 'GET_BADGES',
  payload: {
    badges,
  },
});
