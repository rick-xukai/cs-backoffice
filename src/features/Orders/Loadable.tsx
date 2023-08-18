/**
 * Asynchronously loads the component for Orders
 */

import loadable from '../../utils/loadable';

export default loadable(() => import('./index'));
