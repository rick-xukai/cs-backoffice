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
    get: '/admin/withdraw',
  },
  transactions: {
    get: '/admin/withdraw/{transactionId}',
    post: '/admin/withdraw',
  },
};

export default API;
