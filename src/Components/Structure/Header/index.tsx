import React from 'react'
import { Button } from '../../'
import styles from './styles.module.scss'
import cn from 'clsx'
import { useLocation } from 'react-router-dom'
import { PAGE } from '../../../constants'
import { useNavigate } from 'react-router-dom'

interface Props extends React.HTMLAttributes<HTMLHeadElement> {}

export const Header: React.FC<Props> = (props) => {
  const { pathname } = useLocation()
  const pageCharacters = PAGE.CHARACTERS()
  const pageFilmes = PAGE.FILMS()
  const navigate = useNavigate()

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
          <Button
            onClick={() => navigate(PAGE.CHARACTERS())}
            className={cn(styles.button, {
              [styles['-active']]: pathname === pageCharacters,
            })}>
            Personagens
          </Button>
          <Button
            onClick={() => navigate(PAGE.FILMS())}
            className={cn(styles.button, {
              [styles['-active']]: pathname === pageFilmes,
            })}
          >
            Filmes
          </Button>
        </div>
        <Button
          onClick={() => navigate(PAGE.REGISTER())}
        >
          Cadastrar-se
        </Button>
      </div>
    </header>
  )
}

export default Header