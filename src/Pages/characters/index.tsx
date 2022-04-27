import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { initialize } from '../../Api';
import { Character } from '../../Api/models';
import { Grid, Input, Layout, Pagination, Spacing, Title } from '../../Components';
import { PAGE, PAGE_SIZE } from '../../constants';
import { GlobalContext, localStorage, GlobalState } from '../../Context';
import { paginate } from '../../utils';
import { CharacterCard } from './Card';
import styles from './styles.module.scss';

type State ={
  loading: boolean,
  filteredCharacters: Character[],
  pagination: {
    totalOfPages: number,
    currentPage: number,
  },
}

export const Characters: React.FC = () => {
  const { state: { planets, species, vehicles, characters }, dispatch, ActionTypes } = GlobalContext()
  const { search } = useLocation()
  const page = search.split('?page=')[1] || 1
  const navigate = useNavigate()

  const [{ pagination, filteredCharacters }, setState] = useState<State>({
    loading: false,
    filteredCharacters: [],
    pagination: {
      totalOfPages: getTotalOfPages(characters?.length),
      currentPage: Number(page),
    },
  })

  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {
    if (filterValue) {
      filterCards()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValue])

  function filterCards () {
    const filteredCharacters = characters.filter(char => char.name.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase()))
    PaginateCards(filteredCharacters, 1, getTotalOfPages(filteredCharacters.length))
  }

  function getTotalOfPages (arraylength: number) {
    return Math.ceil(arraylength / PAGE_SIZE)
  }

  function updateLocalStorage (data: GlobalState) {
    window.localStorage.setItem('state', JSON.stringify(data));
  }

  const fetchStarWarsData = useCallback(async () => {
    try {
      const data = await initialize()
      dispatch({
        type: ActionTypes.SET_CONTEXT,
        payload: data
      })
      updateLocalStorage(data)
      setState(prevState => ({ ...prevState, pagination: { ...prevState.pagination, paginate: true } }))
    } catch (error) {
      
    }
  }, [ActionTypes.SET_CONTEXT, dispatch])

  useEffect(() => {
    if (!localStorage) {
      fetchStarWarsData()
    } else {
      PaginateCards(characters, 1, getTotalOfPages(characters.length))
    }
  }, [fetchStarWarsData, characters])

  useEffect(() => {
    const array = filterValue ? filteredCharacters : characters
    PaginateCards(array, Number(page), getTotalOfPages(array?.length))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  function PaginateCards (characters: Character[], currentPage: number, totalOfPages: number) {
    const paginatedCards = paginate(currentPage, characters)
    setState(prevState => ({
      ...prevState,
      filteredCharacters: paginatedCards,
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
        <Title as='h2'>Personagens</Title>
        <Spacing appearance='x-large'/>
        <Input
          onChange={e => setFilterValue(e.target.value)}
          placeholder='FILTRE POR NOME DO PERSONAGEM'
        />
        <Spacing appearance='large'/>
      </div>

      <Grid>
        { filteredCharacters?.map(character => {
          const characterData = {
            name: character.name!,
            birth_year: character.birth_year!,
            height: character.height!,
            homeworld: planets.find(planet => planet.url === character.homeworld)?.name!,
            species: !character.species.length ? character.species : [ species.find(specie => specie.url === character.species[0])?.name!],
            vehicles: character.vehicles.map(vehicle => (vehicles.find(v => v.url === vehicle)!?.name))!
          }

          return (
            <CharacterCard key={character.url} character={characterData}/>
          )
        }) }
      </Grid>
      <div className={styles.container}>
        <Spacing appearance='large'/>
        <Pagination
          onChange={(page) => navigate(`${PAGE.CHARACTERS()}?page=${page}`, { replace: true })}
          currentPage={pagination.currentPage}
          numberOfPages={pagination.totalOfPages}
        />
      </div>
    </Layout>
  )
}

export default Characters