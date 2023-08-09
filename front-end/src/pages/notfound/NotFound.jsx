// import React from 'react';
import styles from './NotFound.module.css';
function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.notFoundMessage}>
        <h1 className={styles.animatetext}>404</h1>
      </div>
    </div>
  )
}

export default NotFound