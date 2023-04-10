/**
 * General constants
 */
export const test = 'test';
export const defaultCurrentPage = 1;
export const defaultPageSize = 20;
export const defaultOrganizerPageSize = 100;
export const ticketStatus = [
  {
    text: 'Upcoming',
    key: 0,
  },
  {
    text: 'Used',
    key: 1,
  },
  {
    text: 'Cancelled',
    key: 2,
  },
  {
    text: 'Expired',
    key: 3,
  },
  {
    text: 'On Sale',
    key: 4,
  },
  {
    text: 'Sold',
    key: 5,
  },
];
export const priceUnit = 'SGD';
export const decimalPlaces = 2;
export const activeStatus = {
  all: {
    text: 'All',
    status: null,
  },
  active: {
    text: 'Active',
    status: true,
  },
  inActive: {
    text: 'Inactive',
    status: false,
  },
};
export const TokenExpire = 7 * 24 * 60 * 60 * 1000;
export const WebAppScannerLinkDev =
  'https://app-dev.ticket-crowdserve.com/scan-qr-code/';
export const TokenExpireResponseCode = 1011;
