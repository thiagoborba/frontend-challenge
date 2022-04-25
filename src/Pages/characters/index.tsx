import React, { useCallback, useEffect } from 'react'
import { initialize } from '../../Api';
import { Input, Layout, Spacing, Title } from '../../Components'
import { CharacterCard } from './Card'
import { Grid } from '../../Components/Grid'
import styles from './styles.module.scss';
import { GlobalContext } from '../../Context'

// const INITIAL_STATE = {
//   loading: false,
//   pagination: {
//     totalOfPages: 1,
//     currentPage: 1,
//   }
// }

export const Characters: React.FC = () => {
  // const [{ pagination }, setState] = useState(INITIAL_STATE)

  const { state, dispatch, ActionTypes } = GlobalContext()
  const { characters, planets, species, vehicles } = state

  const fetchStarWarsData = useCallback(async () => {
    try {
      const data = await initialize()
      dispatch({
        type: ActionTypes.SET_CONTEXT,
        payload: data
      })
    } catch (error) {
      
    }
  }, [ActionTypes.SET_CONTEXT, dispatch])

  useEffect(() => {
    if (!state.characters) {
      fetchStarWarsData()
    }
  }, [fetchStarWarsData, state.characters])


  console.log(state)

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
        { characters?.map(character => {
          const characterData = {
            name: character.name!,
            birth_year: character.birth_year!,
            height: character.height!,
            homeworld: planets.find(planet => planet.url === character.homeworld)?.name!,
            species: !character.species.length ? ["Human"] : [ species.find(specie => specie.url === character.species[0])?.name!],
            vehicles: character.vehicles.map(vehicle => (vehicles.find(v => v.url === vehicle)!?.name))!
          }

          return (
            <CharacterCard character={characterData}/>
          )
        }) }
      </Grid>
    </Layout>
  )
}

export default Characters