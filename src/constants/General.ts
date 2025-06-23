/**
 * General constants
 */
export const test = 'test';
export const defaultCurrentPage = 1;
export const defaultPageSize = 20;
export const defaultOrganizerPageSize = 100;
export const GetAllDataPageSize = 100000;
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
export const WebSiteDomain = 'https://';
export const UserRole = [
  {
    key: 0,
    text: 'Super Admin',
  },
  {
    key: 1,
    text: 'Partner Admin',
  },
  {
    key: 2,
    text: 'Organizer Admin',
  },
  {
    key: 3,
    text: 'Organizer User',
  },
  {
    key: 4,
    text: 'Scanner',
  },
];
export const UserActiveStatus = [
  {
    key: 0,
    text: 'Pending activation',
  },
  {
    key: 1,
    text: 'Active',
  },
];
export const UploadFileAcceptType = ['image/png', 'image/jpeg', 'image/gif'];
export enum SetRefundKey {
  refundable = 1,
  nonRefundable = 0,
}
export const DescriptionImagesSize = [
  {
    key: 8,
    text: 'small',
  },
  {
    key: 12,
    text: 'medium',
  },
  {
    key: 24,
    text: 'large',
  },
];
export const DeleteTicket = 'deleteTicket';
export const SortKeys = {
  descend: 'descend',
  ascend: 'ascend',
};
export const UploadCSVType = 'text/csv';
export const ImportTicketsTemplate = [
  { label: 'Attendee Email', key: 'attendeeEmail' },
  { label: 'Ticket Type', key: 'ticketType' },
  { label: 'Event Name', key: 'eventName' },
];
export const TicketSoldFilterStatus = [
  {
    id: 0,
    name: 'Live',
  },
  {
    id: 1,
    name: 'Used',
  },
  {
    id: 2,
    name: 'Cancelled',
  },
  {
    id: 3,
    name: 'Expired',
  },
  {
    id: 5,
    name: 'Sold',
  },
  {
    id: 6,
    name: 'Transferred',
  },
  {
    id: null,
    name: 'Listed',
  },
];
export const TicketSoldFilterSource = [
  {
    id: 0,
    name: 'Primary Market',
  },
  {
    id: 1,
    name: 'Secondary Market',
  },
  {
    id: 2,
    name: 'Ticket Imported',
  },
];
export const TicketSoldSaleStatus = 1;
export const ImportTicketInvalid = 1081;
export const ScannerRole = 4;
export const EmailExist = 1101;
export const GetSettingsType = {
  eventPopup: 'event_popup',
};
export enum EmailStatus {
  sent = 1,
  scheduled = 0,
}
export const EmailStatusKey = [
  {
    key: null,
    name: 'All',
  },
  {
    key: 0,
    name: 'Scheduled',
  },
  {
    key: 1,
    name: 'Sent',
  },
];
export enum SendingTime {
  send = 'Send Immediately',
  limited = 'Scheduled Time Delivery',
}
export const MaxEditorLength = 5000;
export const SizeWhiteList = ['12px', '15px', '20px', '40px'];
export const EmailTemplateDearUser =
  '<div style="font-size: 15px; margin-bottom: 24px; max-width: 640px !important; margin: auto !important;">Dear {User Name},</div>';
export const FacebookIconLink =
  'https://app-dev.ticket-crowdserve.com/_next/static/media/facebook.157defdf.jpg';
export const InstagramIconLink =
  'https://app-dev.ticket-crowdserve.com/_next/static/media/ins.a99d301f.jpg';
export const WebsiteIconLink =
  'https://app-dev.ticket-crowdserve.com/_next/static/media/website.3d6350de.jpg';
