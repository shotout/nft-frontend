import {useEffect, useRef, useState} from 'react';
import {stringToNumber} from '../helpers/parseNumber';

const useHypeFlame = (value, hypeAmount) => {
  // console.log('Check value:', value);
  const validateMaxTotal = stringToNumber(value.maxTotal);
  const [hypeValue, setHypeValue] = useState(value.currentAmount);
  const timerInterval = useRef(null);

  useEffect(() => {
    timerInterval.current = setInterval(() => {
      setHypeValue(prevValue => prevValue + Math.floor(Math.random() * 10));
    }, 2000);

    return () => clearInterval(timerInterval.current);
  }, [validateMaxTotal]);

  useEffect(() => {
    if (hypeValue > validateMaxTotal) {
      console.log('Clear interval:', hypeValue);
      clearInterval(timerInterval.current);
    }
    hypeAmount.current = hypeValue;
  }, [hypeValue]);

  return {
    hypeValue,
  };
};

export {useHypeFlame};
