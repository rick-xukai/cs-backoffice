/**
 * Asynchronously loads the component for Ticket Detail
 */

import loadable from '../../utils/loadable';

export default loadable(() => import('./index'));
