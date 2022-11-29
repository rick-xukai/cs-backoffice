const API = {
  login: {
    post: 'login',
  },
  register: {
    post: 'register',
  },
  getEventsList: {
    get: '/events/list',
  },
  getEventsDetail: {
    get: '/eventDetail/{id}',
  },
  getTicketsList: {
    get: '/tickets/list',
  },
};

export default API;
