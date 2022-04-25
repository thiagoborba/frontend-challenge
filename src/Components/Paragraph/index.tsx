import styles from './paragraph.module.scss';
import cn from 'clsx';
import React from 'react';


type Color =
  | 'lightSolid'
  | 'yellow'


export interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
  color?: Color;
}

export const Paragraph: React.FunctionComponent<Props> = ({
  color = 'lightSolid',
  className,
  children,
  ...props
}) => (
  <p
    className={cn(styles['paragraph'], className, {
      [styles['-yellow']]: color === 'yellow',
      [styles['-lightSolid']]: color === 'lightSolid',
    })}
    {...props}
  >
    {children}
  </p>
);


Paragraph.defaultProps = {
  color: 'lightSolid'
}

export default Paragraph;
