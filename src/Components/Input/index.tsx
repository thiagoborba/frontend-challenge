import React from "react";
import styles from './styles.module.scss'
import cn from 'clsx'
import Spacing from "../Spacing";

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: React.ReactNode;
}

export const Input: React.FC<Props> = (({ name, className, onChange, onBlur, label, type, errorMessage,  ...props }) => {
  function handleBlur(e: React.FocusEvent<HTMLInputElement>): void {
    e.preventDefault()
    onBlur && onBlur(e);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault()
    onChange && onChange(e);
  }

  return (
    <div
      className={cn(styles['container'], className)}
    >
      { label && (
        <div>
          <label
            aria-labelledby={`${name}-input`}
            className={styles.label}
          > { label } </label>
          <Spacing appearance="xx-small"/>
        </div>
      ) }
      <input
        className={cn({
          [styles['-upload']]: type === 'file',
        })}
        id={`${name}-input`}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        type={type}
        {...props}
      />
      { errorMessage ? <span className={styles.error}>{ errorMessage }</span> : null }
    </div>
  )
})