// import React, {useState, useCallback, useEffect} from 'react';
// import PropTypes from 'prop-types';
// // import {RNNotificationBanner} from 'react-native-notification-banner';
// import Icon from 'react-native-vector-icons/FontAwesome';
// const CustomNotification = ({title = '', subTitle = '', show = false}) => {
//   let copy = (
//     <Icon name="bell" size={20} color="#9bd5f2" family={'FontAwesome'} />
//   );
//   useEffect(() => {
//     let mounted = true;
//     const callnotification = () => {
//       if (show) {
//         RNNotificationBanner.Show({
//           tintColor: '#9bd5f2',
//           title: title,
//           subTitle: subTitle,
//           withIcon: true,
//           icon: copy,
//         });
//       }
//     };
//     mounted && callnotification();
//     return () => (mounted = false);
//   }, [show]);

//   return <></>;
// };

// CustomNotification.propTypes = {};

// export default CustomNotification;
