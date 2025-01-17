import React from 'react';
import PropTypes from 'prop-types';

const Dateconverter = (dates) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const date = new Date(dates);
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  const fullday = `${monthNames[month]}/${day}/${year}`;
  return fullday;
};
export default Dateconverter;
