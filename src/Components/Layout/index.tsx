import React from "react";
import styles from './styles.module.scss'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const Layout: React.FC<Props> = ({ children, ...props }) => {
  return (
    <div
      className={styles['container']}
      {...props}
    >
      { children }
    </div>
  )
}