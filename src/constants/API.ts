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
  getProfileInfo: {
    get: '/admin/my/organizer',
    put: '/admin/my/organizer',
  },
  getUserPermissionsList: {
    get: '/admin/my/user',
  },
  fetchOpenAi: {
    post: '/admin/openai',
  },
  getListTicketType: {
    get: '/admin/event/ticketType',
  },
  cancelEvent: {
    put: '/admin/event/:eventId/cancel',
  },
  deleteEvent: {
    put: '/admin/event/:eventId/delete',
  },
  checkDiscountCode: {
    post: '/admin/event/discount/code/check',
  },
  checkConnectTicket: {
    post: '/admin/event/:eventId/:ticketTypeId/check',
  },
  getEventDashboard: {
    get: '/admin/event/:event_id/dashboard',
  },
  getTicketSoldList: {
    get: '/admin/event/:event_id/user_ticket',
  },
  getTicketSoldCount: {
    get: '/admin/event/:eventId/sold_count',
  },
  updateTicketStatus: {
    put: '/admin/user_ticket/:userTicketId/status',
  },
  importTickets: {
    post: '/admin/event/:eventId/import_ticket',
  },
  getEventPageView: {
    get: '/admin/event/:eventId/dashboard/page_view',
  },
  getEventPageViewAnalysis: {
    get: '/admin/event/:eventId/page_view/analysis',
  },
  getUnqiueBuyers: {
    get: '/admin/event/:eventId/buyers',
  },
  getUnqiueAttendeesSummary: {
    get: '/admin/event/:eventId/attendees/summary',
  },
  getUnqiueAttendees: {
    get: '/admin/event/:eventId/attendees',
  },
  getEventScanned: {
    get: '/admin/event/:eventId/scanned',
  },
  getUniqueBuyersCharts: {
    get: '/admin/event/:eventId/dashboard/unique_buyers',
  },
};

export default API;
