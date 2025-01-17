import React from "react";
import PropTypes from "prop-types";

const waitinterval = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};
export default waitinterval;
