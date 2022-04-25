import React from 'react'
import { Button } from '../../'
import styles from './styles.module.scss'

interface Props extends React.HTMLAttributes<HTMLHeadElement> {}

export const Header: React.FC<Props> = (props) => {
  return (
    <header
      { ...props }
    >
      <div
        className={styles.header}
      >
        <div
          className={styles['logo-container']}
        >
          <span className={styles.logo}>
            Star <br/> Wars
          </span>
          <span className={styles.casting}>
            Casting
          </span>
        </div>

        <div className={styles['buttons-container']}>
          <Button className={styles.button}>
            Personagens
          </Button>
          <Button className={styles.button}>
            Filmes
          </Button>
        </div>
        <Button>
          Cadastrar-se
        </Button>
      </div>
    </header>
  )
}

export default Header