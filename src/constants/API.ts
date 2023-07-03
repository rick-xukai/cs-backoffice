export enum AuthorizationType {
  bearer = 'Bearer',
}

const API = {
  login: {
    post: '/admin/session',
  },
  register: {
    post: 'register',
  },
  getEventsList: {
    get: '/admin/event',
  },
  createEvent: {
    post: '/admin/event',
  },
  updateEvent: {
    put: '/admin/event/{eventId}',
  },
  getOrganizer: {
    get: '/admin/organizer',
  },
  getEventsDetail: {
    get: '/admin/event/{eventId}',
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
  getUsersList: {
    get: '/admin/user',
  },
  getUserDetail: {
    get: '/admin/user/{userId}',
  },
  getUserDetailTickets: {
    get: '/admin/user/{userId}/ticket',
  },
  uploadFile: {
    post: '/admin/file',
  },
  changePassword: {
    put: '/admin/my/password',
  },
  fogogtPassword: {
    post: '/admin/my/forget_password',
  },
  verificationCode: {
    post: '/admin/my/verification',
  },
  resetPassword: {
    post: '/admin/my/reset_password',
  },
};

export default API;
