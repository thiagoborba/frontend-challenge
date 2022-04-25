import React from 'react'
import styles from './styles.module.scss'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const Grid: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.container}>
      { children }
    </div>
  )
}