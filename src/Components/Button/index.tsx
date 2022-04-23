import { Button as Materialbutton, ButtonProps } from '@mui/material'
import {  styled } from '@mui/material/styles';

export const Button = styled(Materialbutton)<ButtonProps>(({ theme, color }) => ({
  color: color || theme.palette.secondary.contrastText,
  width: '174px',
  height: '42px',
  border: `2px solid ${theme.palette.secondary.contrastText}`,
  ':hover': {
    opacity: 0.4,
  },
}));