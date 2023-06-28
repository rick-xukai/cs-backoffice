export const isEmail = (value: string) =>
  /* eslint-disable max-len */
  /* eslint-disable no-useless-escape */
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{1,1})+([^<>()\.,;:\s@\"]{2,}))$/.test(
    value,
  );

export const emailValidator = (_: object, value: string) => {
  if (!value) {
    return Promise.reject(new Error('Email is required'));
  }
  if (!isEmail(value)) {
    return Promise.reject(new Error('Please enter a valid email address.'));
  }
  return Promise.resolve();
};
