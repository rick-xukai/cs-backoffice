/**
 * Asynchronously loads the component for Transactions
 */

import loadable from '../../utils/loadable';

export default loadable(() => import('./index'));
