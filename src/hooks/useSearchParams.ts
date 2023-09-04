import { useLocation } from 'react-router-dom';
const useSearchParams = (id: string) => {
  const query = new URLSearchParams(useLocation().search);
  return query.get(id);
};
export default useSearchParams;
