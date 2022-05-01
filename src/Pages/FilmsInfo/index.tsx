import React from 'react';
import { Box, Layout, Link, Paragraph, Spacing, Title } from '../../Components';
import { useLocation } from 'react-router-dom'
import { PAGE } from '../../constants';
import { GlobalContext } from '../../Context'
import styles from './styles.module.scss'
import dayjs from 'dayjs'

export const FilmInfos: React.FC = () => {
  const { state: { films, characters, species, vehicles, starships, planets } } = GlobalContext()
  const location = useLocation()
  const filmName = decodeURI(location.pathname.split(PAGE.FILMS_INFO(''))[1])
  const film = films.find(film => film.title === filmName)

  const updateHour = dayjs(film?.created).format("HH:MM")
  const updateDate = dayjs(film?.edited).format("DD/MM/YYYY")

  const createsHour = dayjs(film?.created).format("HH:MM")
  const createsDate = dayjs(film?.created).format("DD/MM/YYYY")


  return (
    <Layout className={styles.container}>
      <Spacing appearance='xx-large' />
      <div
        className={styles['name-container']}
      >
        <div>
          <Title as='h2'>
            {film?.title.toLocaleLowerCase()}
          </Title>
          <Paragraph className={styles.paragraph}>
            Episódio {film?.episode_id}
          </Paragraph>
        </div>

        <div className={styles['date-container']}>
          <Paragraph> ATUALIZADA EM: {updateDate} ás {updateHour}</Paragraph>
          <Paragraph> CRIADO EM: {createsDate} ás {createsHour}</Paragraph>
        </div>
      </div>
      <Spacing appearance='xx-large' />

      <div className={styles['grid-screen']}>
        <div
          className={styles.opening}
        >
          <Title as='h4'>
            Sinopse
          </Title>
          <Spacing appearance='medium' />
          <Paragraph>
            { film?.opening_crawl }
          </Paragraph>
        </div>
        <div
          className={styles.datasheet}
        >
          <Title as='h4'>
            Ficha técnica
          </Title>
          <Spacing appearance='medium' />
          <Box>
            <div>
              <Title as='h6' color='lightSolid'>
                Diretor
              </Title>
              <Spacing appearance='xx-small' />
              <Paragraph>
                { film?.director }
              </Paragraph>
            </div>
            <div>
              <Title as='h6' color='lightSolid'>
                Produtores
              </Title>
              <Spacing appearance='xx-small' />
              <Paragraph>
                { film?.producer }
              </Paragraph>
            </div>
          </Box>
          <Spacing appearance='medium' />
          <div>
            <Title as='h6' color='lightSolid'>
              Lançamento
            </Title>
            <Spacing appearance='xx-small' />
            <Paragraph>
              { dayjs(film?.release_date).format('DD/MM/YYYY') }
            </Paragraph>
          </div>
        </div>
        <div
          className={styles.films}
        >
          <Title as='h4'>
          Aparecem nesse filme
          </Title>
          <Spacing appearance='medium' />
          <div className={styles['films-container']}>
            <div>
              <Title as='h6' color='lightSolid'>
                Personagens
              </Title>
              <Spacing appearance='xx-small' />
              <div className={styles['grid-films']}>
                { film?.characters.map(char => {
                  const charName = characters.find(c => c.url === char)?.name!
                  return (
                    <Link to={PAGE.CHARACTERS_INFO(charName)}>{charName}</Link>
                  )
                }) }
              </div>
            </div>
            <div>
              <Title as='h6' color='lightSolid'>
                Espécies
              </Title>
              <Spacing appearance='xx-small' />
              <div className={styles['grid-films']}>
                { film?.species.map(specie => {
                  const specieName = species.find(s => s.url === specie)?.name!
                  return (
                    <Paragraph>
                      { specieName }
                    </Paragraph>
                  )
                }) }
              </div>
            </div>
          </div>
          <Spacing appearance='medium' />
          <div className={styles['films-container']}>
            <div>
              <Title as='h6' color='lightSolid'>
                veículos
              </Title>
              <Spacing appearance='xx-small' />
              { film?.vehicles.map(vehicle => {
                const vehicleName = vehicles.find(v => v.url === vehicle)?.name!
                return (
                  <Paragraph>
                      { vehicleName }
                  </Paragraph>
                )
              }) }
            </div>
            <div>
              <Title as='h6' color='lightSolid'>
                Naves
              </Title>
              <Spacing appearance='xx-small' />
              { film?.starships.map(starship => {
                const starshipName = starships.find(s => s.url === starship)?.name!
                return (
                  <Paragraph>
                  { starshipName }
                  </Paragraph>
                )
              }) }
            </div>
            <div>
              <Title as='h6' color='lightSolid'>
                Planetas
              </Title>
              <Spacing appearance='xx-small' />
              { film?.planets.map(planet => {
                const planetName = planets.find(p => p.url === planet)?.name!
                return (
                  <Paragraph>
                      { planetName }
                  </Paragraph>
                )
              }) }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default FilmInfos