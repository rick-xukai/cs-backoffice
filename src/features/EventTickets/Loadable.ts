/**
 * Asynchronously loads the component for Event Tickets
 */

import loadable from '../../utils/loadable';

export default loadable(() => import('./index'));
