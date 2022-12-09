import { format, getUnixTime } from 'date-fns';
import { utcToZonedTime, format as formatTZ } from 'date-fns-tz';

import {
  FullScreenDocument,
  FullScreenDocumentElement,
} from '../constants/types';

const OneMin = 60;
const OneHour = 3600;

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
