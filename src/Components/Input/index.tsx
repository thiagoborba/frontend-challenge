import React from "react";
import styles from './styles.module.scss'
import cn from 'clsx'

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
}

export const Input = React.forwardRef<HTMLInputElement, Props>(({ name, className, ...props }, ref) => {
  return (
    <input
      className={cn(styles['container'], className)}
      id={`${name}-input`}
      name={name}
      {...props}
    />
  )
})