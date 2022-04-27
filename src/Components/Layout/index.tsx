import React from "react";
import cn from 'clsx'
import styles from './styles.module.scss'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const Layout: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(styles['container'], className)}
      {...props}
    >
      { children }
    </div>
  )
}