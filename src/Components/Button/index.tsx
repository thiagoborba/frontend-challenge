import React from 'react'
import styles from './styles.module.scss'
import cn from 'clsx'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}

export const Button: React.FC<Props> = ({ className, ...props }) => {
  return (
    <button
      className={cn(styles.button, className)}
      { ...props }
    />
  )
}

export default Button