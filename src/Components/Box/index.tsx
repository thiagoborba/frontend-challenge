import React from 'react'
import styles from './styles.module.scss'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const Box: React.FC<Props> = ({ children, ...props }) => {
  return (
    <div
      className={styles.box}
      {...props}
    >
      { children }
    </div>
  )
}

export default Box