import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Film } from '../../Api/models';
import { Grid, Input, Layout, Pagination, Spacing, Title } from '../../Components';
import { PAGE, PAGE_SIZE } from '../../constants';
import { GlobalContext } from '../../Context';
import { paginate } from '../../utils';
import { FilmCard } from './Card';
import styles from './styles.module.scss';

type State ={
  loading: boolean,
  filteredFilms: Film[],
  pagination: {
    totalOfPages: number,
    currentPage: number,
  },
}

export const Films: React.FC = () => {
  const { state: { characters, films }} = GlobalContext()
  const { search } = useLocation()
  const page = search.split('?page=')[1] || 1
  const navigate = useNavigate()

  const [{ pagination, filteredFilms }, setState] = useState<State>({
    loading: false,
    filteredFilms: [],
    pagination: {
      totalOfPages: getTotalOfPages(characters?.length),
      currentPage: Number(page),
    },
  })

  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {
    if (filterValue) {
      filterCards()
    } else {
      setState(prevState => ({
        ...prevState,
        filteredFilms: films,
      }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValue])

  function filterCards () {
    const filteredFilms = films.filter(char => char.title.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase()))
    PaginateCards(filteredFilms, 1, getTotalOfPages(filteredFilms.length))
  }

  function getTotalOfPages (arraylength: number) {
    return Math.ceil(arraylength / PAGE_SIZE)
  }

  useEffect(() => {
    const array = filterValue ? filteredFilms : films
    PaginateCards(array, Number(page), getTotalOfPages(array?.length))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  function PaginateCards (films: Film[], currentPage: number, totalOfPages: number) {
    const paginatedCards = paginate(currentPage, films)
    setState(prevState => ({
      ...prevState,
      filteredFilms: paginatedCards,
      pagination:{
        totalOfPages,
        currentPage
      }
    }))
  }

  return (
    <Layout>
      <div className={styles.container}>
        <Spacing appearance='xx-large'/>
        <Title as='h2'>Filmes</Title>
        <Spacing appearance='x-large'/>
        <Input
          type='search'
          onChange={e => setFilterValue(e.target.value)}
          placeholder='FILTRE POR NOME DO FILME'
        />
        <Spacing appearance='large'/>
      </div>

      <Grid>
        { filteredFilms.map(film => (
          <FilmCard film={{
            director: film.director,
            episode_id: film.episode_id,
            release_date: film.release_date,
            title: film.title
          }}
          key={film.title}
        />
        )) }
      </Grid>
      { !filterValue && (
        <div className={styles.container}>
          <Spacing appearance='large'/>
          <Pagination
            onChange={(page) => navigate(`${PAGE.FILMS()}?page=${page}`, { replace: true })}
            currentPage={pagination.currentPage}
            numberOfPages={pagination.totalOfPages}
          />
        </div>
      )  }
    </Layout>
  )
}

export default Films