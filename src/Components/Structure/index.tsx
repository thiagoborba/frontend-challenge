import React from 'react'
import { TopAppBar } from './AppBar'
import styles from './styles.module.scss'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const Structure: React.FC<Props> = (props) => {
  return (
    <div className={styles.root}>
      <TopAppBar />
      <main className={styles.content}>
        { props.children }
      </main>
    </div>
  )
}

export default Structure
