import moment from 'moment';

export const dateToUnix = date => moment(date).unix();
export const getFutureDate = date =>
  moment().add(date, 'days').format('YYYY-MM-DD');
export const secondToMinutes = duration => {
  const padSecond = number => (number < 10 ? '0' : '') + number;
  if (duration) {
    const minutes = duration / 60;
    const second = duration % 60;
    return `${minutes === 0 ? '00' : padSecond(Math.floor(minutes))}${
      second === 0 ? ':00' : `:${padSecond(Math.floor(second))}`
    }`;
  }
  return null;
};

export const parseTimerHoursFormat = (duration, hideNull) => {
  const padSecond = number => (number < 10 ? '0' : '') + number;
  if (duration) {
    const hours = Math.floor(Number(duration / 3600));
    const minutes = (duration % 3600) / 60;
    const second = duration % 60;
    if (hideNull) {
      return `${hours < 1 ? '' : hours}${
        minutes < 1 ? '00' : `${padSecond(Math.floor(minutes))}`
      }${second === 0 ? '00' : `:${padSecond(Math.floor(second))}`}`;
    }
    return `${hours < 1 ? '00' : hours}${
      minutes < 1 ? ':00' : `:${padSecond(Math.floor(minutes))}`
    }${second === 0 ? ':00' : `:${padSecond(Math.floor(second))}`}`;
  }
  return null;
};

export const normalizeNumber = total => {
  if (parseInt(total) < 10) {
    return `0${total}`;
  }
  return total;
};

export const reformatDate = valueDate => {
  if (valueDate) {
    const formatYears = moment(valueDate).format('YYYY');
    const formatMonth = moment(valueDate).format('MM');
    const formatDay = moment(valueDate).format('DD');
    const formatHours = moment(valueDate).format('HH');
    const minutes = moment(valueDate).format('mm');
    return new Date(
      formatYears,
      formatMonth - 1,
      formatDay,
      formatHours,
      minutes,
      30,
      0,
    );
  }
  return new Date();
};

export const getRunningFastingTime = currentTime => {
  let value = null;
  let getHours = null;
  let getMinutes = null;
  let getSecond = null;
  if (currentTime < 60) {
    value = `00:${normalizeNumber(currentTime)}`;
  }
  if (currentTime >= 60 && currentTime < 3600) {
    getMinutes = Math.floor(currentTime / 60);
    getSecond = currentTime % 60;
    value = `${normalizeNumber(getMinutes)}:${normalizeNumber(getSecond)}`;
  }
  if (currentTime >= 3600) {
    getHours = Math.floor(currentTime / 3600);
    getMinutes = Math.floor((currentTime % 3600) / 60);
    getSecond = Math.floor((currentTime % 3600) % 60);
    value = `${normalizeNumber(getHours)}:${normalizeNumber(
      getMinutes,
    )}:${normalizeNumber(getSecond)}`;
  }
  return value;
};
