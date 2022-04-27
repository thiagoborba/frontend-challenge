import React from "react";
import styles from './styles.module.scss'
import cn from 'clsx'
import Spacing from "../Spacing";

export interface Props extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  errorMessage?: React.ReactNode;
}

export const Textarea: React.FC<Props> = (({ name, className, onChange, onBlur, label, errorMessage,  ...props }) => {
  function handleBlur(e: React.FocusEvent<HTMLTextAreaElement>): void {
    e.preventDefault()
    onBlur && onBlur(e);
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
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
            aria-labelledby={`${name}-textarea`}
            className={styles.label}
          > { label } </label>
          <Spacing appearance="xx-small"/>
        </div>
      ) }
      <textarea
        id={`${name}-textarea`}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        {...props}
      />
      { errorMessage ? <span className={styles.error}>{ errorMessage }</span> : null }
    </div>
  )
})