import React, { useCallback, useEffect, useState } from 'react'
import { initialize } from '../../Api';
import { Character } from '../../Api/models';
import { Input, Layout, Pagination, Spacing, Title } from '../../Components'
import { CharacterCard } from './Card'
import { Grid } from '../../Components/Grid'
import styles from './styles.module.scss';
import { GlobalContext, localStorage } from '../../Context'
import { PAGE, PAGE_SIZE } from '../../constants';
import { paginate } from '../../utils'
import { useNavigate, useLocation, useParams } from 'react-router-dom'

type State ={
  loading: boolean,
  filtredCharacters: Character[],
  pagination: {
    paginate: boolean,
    totalOfPages: number,
    currentPage: number,
  }
}

export const Characters: React.FC = () => {
  const { state: context, dispatch, ActionTypes } = GlobalContext()
  const { planets, species, vehicles } = context

  const navigate = useNavigate()
  const { search } = useLocation()
  const page = search.split('?page=')[1] || 1

  const [{ pagination, filtredCharacters }, setState] = useState<State>({
    loading: false,
    filtredCharacters: [],
    pagination: {
      paginate: false,
      totalOfPages: Math.ceil(context?.characters?.length / PAGE_SIZE) || 1,
      currentPage: Number(page),
    }
  })

  const fetchStarWarsData = useCallback(async () => {
    try {
      const data = await initialize()
      dispatch({
        type: ActionTypes.SET_CONTEXT,
        payload: data
      })
      window.localStorage.setItem('state', JSON.stringify(data));
      setState(prevState => ({ ...prevState, pagination: { ...prevState.pagination, paginate: true } }))
    } catch (error) {
      
    }
  }, [ActionTypes.SET_CONTEXT, dispatch])

  useEffect(() => {
    if (!localStorage) {
      fetchStarWarsData()
    } else {
      setState(prevState => ({ ...prevState, pagination: { ...prevState.pagination, paginate: true } }))
    }
  }, [fetchStarWarsData, context])


  useEffect(() => {
    if (pagination.paginate) {
      const filtredChar = paginate(pagination.currentPage, context.characters)
      setState(prevState => ({
        ...prevState,
        filtredCharacters: filtredChar,
        pagination: { ...prevState.pagination, paginate: false }
      }))
    }
  }, [context.characters, pagination.currentPage, pagination.paginate])

  useEffect(() => {
    setState(prevState => ({ ...prevState, pagination: { ...prevState.pagination, paginate: true, currentPage:  Number(page) } }))
  }, [page])

  return (
    <Layout>
      <div className={styles.container}>
        <Spacing appearance='xx-large'/>
        <Title as='h4'>Personagens</Title>
        <Spacing appearance='x-large'/>
        <Input
          placeholder='FILTRE POR NOME DO PERSONAGEM'
        />
        <Spacing appearance='large'/>
      </div>

      <Grid>
        { filtredCharacters?.map(character => {
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