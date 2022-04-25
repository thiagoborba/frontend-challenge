import React from 'react'
import styles from './styles.module.scss'
import cn from 'clsx'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}


export const Card: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(styles.card, className)}
      { ...props }
    >
      { children }
    </div>
  )
}

export default Card