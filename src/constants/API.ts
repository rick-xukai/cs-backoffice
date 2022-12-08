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
  ticketsDetail: {
    get: '/ticketsDetail/{id}',
    put: '/updateTicket/{id}',
  },
  getTransactionsList: {
    get: '/transactions/list',
  },
  transactions: {
    get: '/transactionDetail/{id}',
    post: '/transactions/status',
  },
};

export default API;
