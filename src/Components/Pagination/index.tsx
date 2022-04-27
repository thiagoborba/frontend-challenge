import * as React from 'react';
import cn from 'clsx';
import styles from './styles.module.scss'
import {Button} from '../';

export interface Props
  extends Pick<
    React.HTMLAttributes<HTMLUListElement>,
    Exclude<keyof React.HTMLAttributes<HTMLUListElement>, 'onChange'>
  > {
  numberOfPages: number;
  currentPage: number;
  onChange: (page: number) => void;
}

export const Pagination: React.FunctionComponent<Props> = ({
  className,
  numberOfPages,
  currentPage,
  onChange,
  ...props
}) => {

  const isFirstPage = currentPage === 1
  const nextPage = currentPage + 1
  const previousPage = currentPage - 1
  const isLastPage = currentPage === numberOfPages

  const firstButtonPage = isFirstPage ? currentPage : isLastPage ? previousPage - 1 : previousPage
  const secondButtonPage = isFirstPage ? nextPage :  isLastPage ? previousPage : currentPage
  const LastButtonPage = isLastPage ? currentPage : isFirstPage ? nextPage + 1 : nextPage

  return (
    <nav
      role="navigation"
      aria-label="Paginação"
      className={styles.pagination}
      {...props}
    >
      <ol>
        <li>
          <Button onClick={() => onChange(isFirstPage ? 1 : previousPage)}>
            { '<' }
          </Button>
        </li>
        <li>
          <Button
          onClick={() => onChange(firstButtonPage)}
          className={cn({
            [styles['page-button']]: !isFirstPage
          })}
          >
            { firstButtonPage }
          </Button>

          { numberOfPages >= 2 && (
            <Button
              onClick={() => onChange(secondButtonPage)}
              className={cn({
                [styles['page-button']]: isFirstPage || isLastPage
              })}
              >
                {secondButtonPage}
            </Button>
          ) }

          { numberOfPages >= 3 && (
            <Button
              onClick={() => onChange(LastButtonPage)}
              className={cn({
                [styles['page-button']]: !isLastPage
              })}
            >
              { LastButtonPage }
            </Button>
          )}
        </li>
        <li>
          <Button
            onClick={() => onChange(isLastPage ? numberOfPages : nextPage)}
          >
            { '>' }
          </Button>
        </li>
      </ol>
    </nav>
  );
};

export default Pagination;
