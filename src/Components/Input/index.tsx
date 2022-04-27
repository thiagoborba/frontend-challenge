import React from "react";
import styles from './styles.module.scss'
import cn from 'clsx'

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<Props> = (({ name, className, onChange, onBlur, ...props }) => {
  function handleBlur(e: React.FocusEvent<HTMLInputElement>): void {
    e.preventDefault()
    onBlur && onBlur(e);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault()
    onChange && onChange(e);
  }

  return (
    <input
      className={cn(styles['container'], className)}
      id={`${name}-input`}
      name={name}
      onBlur={handleBlur}
      onChange={handleChange}
      {...props}
    />
  )
})