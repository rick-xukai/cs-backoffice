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
    return Promise.reject(new Error('Please enter a valid email address'));
  }
  return Promise.resolve();
};

export const passwordMinLength = 8;

export const passwordValidator = (_: object, value: string) => {
  if (value && value.length < passwordMinLength) {
    return Promise.reject(new Error('Password must be at least 8 characters'));
  }
  return Promise.resolve();
};

const verificationCodeRegex = /^[0-9]{6}$/;
export const verificationCodeValidator = (_: object, value: string) => {
  if (value && !verificationCodeRegex.test(value)) {
    return Promise.reject(new Error('Invalid verification code'));
  }
  return Promise.resolve();
};
