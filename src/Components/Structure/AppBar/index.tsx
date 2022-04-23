import React from 'react'
import { AppBar, AppBarProps, Button as MaterialButton, ButtonProps, Box, BoxProps } from '@mui/material'
import { Button } from '../../index'
import {  styled } from '@mui/material/styles';
import styles from './styles.module.scss'

const StyledButton = styled(MaterialButton)<ButtonProps>(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  ':hover': {
    background: '#303030 0% 0% no-repeat padding-box',
  },
  width: '273px',
  borderRadius: '999px',
}));

const ButtonsContainer = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

const HeaderContainer = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 100px',
  height:' 100px',
  backgroundColor: theme.palette.secondary.main,
}));

const LogoContainer = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: theme.palette.secondary.main,
}));


export const TopAppBar: React.FC<AppBarProps> = (props) => {
  return (
    <AppBar
      position="static"
      { ...props }
    >
      <HeaderContainer
        className={styles.header}
      >
        <LogoContainer>
          <span className={styles.logo}>
            Star <br/> Wars
          </span>
          <span className={styles.casting}>
            CASTING
          </span>
        </LogoContainer>

        <ButtonsContainer>
          <StyledButton>
            PERSONAGENS
          </StyledButton>
          <StyledButton>
            FILMES
          </StyledButton>
        </ButtonsContainer>
        <Button>
          Cadastrar-se
        </Button>
      </HeaderContainer>
    </AppBar>
  )
}

export default TopAppBar