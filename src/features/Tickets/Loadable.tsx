/**
 * Asynchronously loads the component for Tickets
 */

import loadable from '../../utils/loadable';

export default loadable(() => import('./index'));
