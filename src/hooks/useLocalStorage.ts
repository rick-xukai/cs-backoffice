import { PREFIX } from '../constants/predicates';

export const useLocalStorage = () => {
  const clear = (): void => {
    localStorage.clear();
  };
  const getItem = (itemKey: string): string | null =>
    localStorage.getItem(`${PREFIX}${itemKey}`);
  const key = (index: number): string | null => localStorage.key(index);
  const removeItem = (itemKey: string): void =>
    localStorage.removeItem(`${PREFIX}${itemKey}`);
  const setItem = (itemKey: string, value: string): void =>
    localStorage.setItem(`${PREFIX}${itemKey}`, value);

  return {
    clear,
    getItem,
    key,
    removeItem,
    setItem,
  };
};
