import * as React from 'react';
import cn from 'clsx';
import styles from './styles.module.scss';

interface Schema extends React.HTMLAttributes<HTMLDivElement> {}

interface Props extends Schema {
  appearance?:
    | 'xxx-small'
    | 'xx-small'
    | 'x-small'
    | 'small'
    | 'medium'
    | 'large'
    | 'x-large'
    | 'xx-large'
    | 'xxx-large';
}

export const Spacing: React.FunctionComponent<Props> = ({ className, ...props }) => (
  <div
    className={cn(styles['spacing'], className, {
      [styles['-xxx-small']]: props['appearance'] === 'xxx-small',
      [styles['-xx-small']]: props['appearance'] === 'xx-small',
      [styles['-x-small']]: props['appearance'] === 'x-small',
      [styles['-small']]: props['appearance'] === 'small',
      [styles['-medium']]: props['appearance'] === 'medium',
      [styles['-large']]: props['appearance'] === 'large',
      [styles['-x-large']]: props['appearance'] === 'x-large',
      [styles['-xx-large']]: props['appearance'] === 'xx-large',
      [styles['-xxx-large']]: props['appearance'] === 'xxx-large',
    })}
    {...props}
  />
);

export default Spacing;
