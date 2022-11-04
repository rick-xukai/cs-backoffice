const Keys = {
  qStep: 'qStep',
};

const getItem = (key: string) => {
  const stored = sessionStorage.getItem(key);
  if (!stored) {
    return '';
  }
  return JSON.parse(stored);
};

const setItem = async (key: string, value: any) => {
  await sessionStorage.setItem(key, JSON.stringify(value));
};

export default {
  Keys,
  getItem,
  setItem,
};
