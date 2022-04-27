import React from 'react';
import styles from './styles.module.scss';
import { Link as RouterLink, LinkProps } from 'react-router-dom'

export const Link: React.FC<LinkProps> = ({ children, to }) => {
  return (
    <RouterLink
      to={to}
      className={styles.link}
    >
      { children }
    </RouterLink>
  )
}


export default Link;
