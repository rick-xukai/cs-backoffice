import { format, getUnixTime } from 'date-fns';
import { utcToZonedTime, format as formatTZ } from 'date-fns-tz';
import CryptoJS from 'crypto-js';
import { Base64 } from 'js-base64';

import { DataEncryptionKeys } from '../constants/Keys';
import {
  FullScreenDocument,
  FullScreenDocumentElement,
} from '../constants/types';

const OneMin = 60;
const OneHour = 3600;
const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY as string;

export const formatTimeStrByTimeString = (
  timeString: string,
  formatType: string,
) => format(new Date(timeString), formatType);

export const timeCounterFunc = (timestamp: number) => {
  const currentTimestamp = getUnixTime(new Date());
  if (!timestamp || timestamp <= currentTimestamp) {
    return {
      hrs: 0,
      mins: 0,
      sec: 0,
    };
  }
  const distanceSeconds = timestamp - currentTimestamp;
  const hrs = Math.floor(distanceSeconds / OneHour);
  const mins = Math.floor((distanceSeconds - hrs * OneHour) / OneMin);
  const sec = distanceSeconds - hrs * OneHour - mins * OneMin;
  return { hrs, mins, sec };
};

export const timeCounterByParamsFunc = (
  timestamp: number | null,
  current: number | null,
) => {
  if (!timestamp || !current || timestamp <= current) {
    return {
      hrs: 0,
      mins: 0,
      sec: 0,
    };
  }
  const distanceSeconds = timestamp - current;
  const hrs = Math.floor(distanceSeconds / OneHour);
  const mins = Math.floor((distanceSeconds - hrs * OneHour) / OneMin);
  const sec = distanceSeconds - hrs * OneHour - mins * OneMin;
  return { hrs, mins, sec };
};
/* eslint-disable complexity */
export const getDeveloperName = (
  firstName: string | null,
  lastName: string | null,
) => {
  if (firstName || lastName) {
    const nameArr = [];
    if (firstName) {
      nameArr.push(firstName);
    }
    if (lastName) {
      nameArr.push(lastName);
    }
    if (nameArr.length > 0) {
      return `${nameArr.join(' ')},`;
    }
    return '';
  }
  return '';
};

export const formatTimestampByTimezone = (
  timestamp: number,
  formatString: string,
  timeZone: string,
) => {
  const startDateObj = new Date(timestamp * 1000);
  const startDateZone = utcToZonedTime(startDateObj, timeZone);
  return formatTZ(startDateZone, formatString, {
    timeZone,
  });
};

export const toggleFullscreen = () => {
  const fsDoc = <FullScreenDocument>document;
  const fsDocElem = <FullScreenDocumentElement>document.documentElement;
  if (
    !document.fullscreenElement &&
    /* alternative standard method */ !fsDoc.mozFullScreenElement &&
    !fsDoc.webkitFullscreenElement
  ) {
    // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (fsDocElem.mozRequestFullScreen) {
      fsDocElem.mozRequestFullScreen();
    } else if (fsDocElem.webkitRequestFullscreen) {
      fsDocElem.webkitRequestFullscreen();
    }
  } else if (fsDoc.cancelFullScreen) {
    fsDoc.cancelFullScreen();
  } else if (fsDoc.mozCancelFullScreen) {
    fsDoc.mozCancelFullScreen();
  } else if (fsDocElem.webkitCancelFullScreen) {
    fsDocElem.webkitCancelFullScreen();
  }
};

export const verificationApi = (response: any) =>
  response.code === 200 && response.message === 'OK';

export const dataEncryption = (data: any, type: string) => {
  let formatData = '{}';
  try {
    if (type === DataEncryptionKeys.encrypt) {
      formatData = CryptoJS.AES.encrypt(data, encryptionKey).toString();
    } else {
      formatData = CryptoJS.AES.decrypt(data, encryptionKey).toString(
        CryptoJS.enc.Utf8,
      );
    }
    // eslint-disable-next-line no-empty
  } catch (_) {
    console.error(_);
  }
  return formatData;
};

export const base64Decrypt = (code: string) => {
  const parsedWordArray = CryptoJS.enc.Base64.parse(code);
  const parsedStr = parsedWordArray.toString(CryptoJS.enc.Utf8);
  return JSON.parse(parsedStr);
};

export const base64Encrypt = (parameters: {}) => {
  const wordArray = CryptoJS.enc.Utf8.parse(JSON.stringify(parameters));
  return CryptoJS.enc.Base64.stringify(wordArray);
};

export const checkEventStatus = (status: number) => {
  let statusText = '';
  switch (status) {
    case 1:
      statusText = 'Upcoming';
      break;
    case 2:
      statusText = 'Ended';
      break;
    case 3:
      statusText = 'Cancelled';
      break;
    default:
      statusText = '';
  }
  return statusText;
};

export const mapEditEventTicket = (ticketsData: any) => {
  const editTicketTypes: any = [];
  ticketsData.forEach((item: any, index: number) => {
    editTicketTypes.push({
      id: item.id,
      ticketTypeId: `Ticket ${(index + 1).toString()}`,
      name: item.name,
      description: item.description,
      price: item.price,
      stock: item.stock,
      ceilingPrice: item.ceilingPrice,
      royaltiesFee: item.royaltiesFee,
      purchaseLimit: item.purchaseLimit,
      image: item.image,
      imageType: item.imageType,
      thumbnailUrl: item.thumbnailUrl,
      thumbnailType: item.thumbnailType,
    });
  });
  return editTicketTypes;
};

export const formatLabelDate = (value: string) =>
  value.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3');

export const base64Format = (value: string, type: string) => {
  if (type === DataEncryptionKeys.encrypt) {
    return Base64.encodeURI(value);
  }
  return Base64.decode(value);
};
