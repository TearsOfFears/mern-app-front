import React from 'react';
import styles from './UserInfo.module.scss';
import moment from 'moment';
export const UserInfo = ({ avatar, fullName, additionalText }) => {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatar?.image || '/noavatar.png'} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{moment(additionalText).format("DD.MM.YY, HH:MM")}</span>
      </div>
    </div>
  );
};
