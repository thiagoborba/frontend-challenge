import React from 'react'
import styles from './styles.module.scss'
import cn from 'clsx'

type Props = {
  show: boolean
}

export const Loader: React.FC<Props> = ({ show }) => {
  return (
    <img className={cn(styles.container, {
      [styles['-no-display']]: !show,
    })} src="/icon.png" alt="img" />
  )
}

export default Loader