export const isEmail = (value: string) =>
  /* eslint-disable max-len */
  /* eslint-disable no-useless-escape */
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{1,1})+([^<>()\.,;:\s@\"]{2,}))$/.test(
    value,
  );
