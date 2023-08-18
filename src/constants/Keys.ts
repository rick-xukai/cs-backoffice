import { Colors } from '../theme';

export const LocalStorageKeys = {
  rememberMe: 'rememberMe',
  i18nLanguage: 'I18N_LANGUAGE',
};
export const CookieKeys = {
  authUser: 'authUser',
  authUserName: 'authUserName',
  authUserRole: 'authUserRole',
  userLoginToken: 'userLoginToken',
};
export const EventTabsKey = {
  eventInfo: 'Event Info',
  ticketList: 'Ticket List',
};
export const UserRoleKeys = {
  superAdmin: '0',
  partnerAdmin: '1',
  organizerAdmin: '2',
  organizerUser: '3',
};
export const StatusKeys = {
  all: {
    text: 'All',
    key: null,
  },
  pending: {
    text: 'Pending',
    key: 0,
  },
  completed: {
    text: 'Completed',
    key: 1,
  },
};
export const SortKeys = {
  descend: 'descend',
  ascend: 'ascend',
};
export const FormatTimeKeys = {
  norm: 'MMM dd, yyyy, HH:mm',
  mdy: 'MMM dd, yyyy',
  hms: 'HH:mm:ss',
  hm: 'HH:mm',
};
export const DataEncryptionKeys = {
  encrypt: 'encrypt',
  decrypt: 'decrypt',
};
export const FilterEventStatus = [
  {
    text: 'Upcoming',
    key: 1,
    color: Colors.orange3,
    background: Colors.orange2,
  },
  {
    text: 'Draft',
    key: 0,
    color: Colors.navy1,
    background: Colors.navy,
  },
  {
    text: 'Ended',
    key: 2,
    color: Colors.white,
    background: Colors.grey7,
  },
  {
    text: 'Cancelled',
    key: 3,
    color: Colors.grey7,
    background: Colors.grey9,
  },
  {
    text: 'All',
    key: null,
    color: '',
    background: '',
  },
];
