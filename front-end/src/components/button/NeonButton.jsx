import React from 'react'
import styles from './NeonButton.module.css'

function NeonButton({buttonName, disabled}) {
  return (
    <button className={styles.neonbutton} disabled={disabled}>{buttonName}</button>
  )
}

export default NeonButton