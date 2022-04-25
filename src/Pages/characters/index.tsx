import React from 'react'
import { Input, Layout, Spacing, Title } from '../../Components'
import Card from '../../Components/Card'
import { Grid } from '../../Components/Grid'
import styles from './styles.module.scss';

export const Characters = () => {
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
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </Grid>
    </Layout>
  )
}

export default Characters