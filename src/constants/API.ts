const API = {
  login: {
    post: 'login',
  },
  register: {
    post: 'register',
  },
  getEventsList: {
    get: '/admin/ticket',
  },
  getEventsDetail: {
    get: '/admin/ticket/{ticketId}',
  },
  getTicketsList: {
    get: '/admin/user_ticket',
  },
  ticketsDetail: {
    get: '/admin/user_ticket/{userTicketId}',
    put: '/admin/user_ticket/{userTicketId}/status',
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
