import React from 'react';
import { Box, Input, Layout, Spacing, Title, Select, Textarea, Button } from '../../Components';
import { GlobalContext } from '../../Context';
import styles from './styles.module.scss';
import { useFormik } from 'formik'

const INITIAL_VALUES = {
  name: '',
  date: '',
  email: '',
  phone: '',
  password: '',
  Rpassword: '',
  character: '',
  file: null,
  resume: ''
}

export const Register: React.FC = () => {
  const { state: { characters } } = GlobalContext()

  const { values, handleBlur, handleChange, setFieldValue, handleSubmit }  = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: (values) => console.log(values)
  })

  return (
    <Layout>
      <Spacing appearance='xxx-large'/>
      <Title as='h2'>Participe do próximo filme</Title>
      <Spacing appearance='x-large'/>
      <form
        noValidate
        onSubmit={handleSubmit}
        className={styles.content}
      >
        <Title as='h4'>Digite suas informações</Title>
        <Spacing appearance='medium'/>
        <Title color='lightSolid' as='h5'>
          informações Gerais
        </Title>
        <Spacing appearance='xx-small'/>
        <Box>
          <Input
            name='name'
            value={values.name}
            label='NOME'
            type='text'
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            name='date'
            value={values.date}
            label='DATA DE NASCIMENTO'
            type='date'
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Box>
        <Spacing appearance='medium'/>
        <Box>
          <Input
            name='email'
            value={values.email}
            label='EMAIL'
            type='email'
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            name='phone'
            value={values.phone}
            label='TELEFONE'
            type='tel'
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Box>
        <Spacing appearance='medium'/>
        <Box>
          <Input
            name='password'
            label='CRIE SUA SENHA'
            type='password'
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            name='Rpassword'
            label='CONFIRME SUA SENHA'
            type='password'
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Box>
        <Spacing appearance='medium'/>
        <Title color='lightSolid' as='h5'>
          Sobre o seu contato com Star Wars
        </Title>
        <Spacing appearance='xx-small'/>
        <Select
          label='QUAL SEU PERSONAGEM FAVORITO?'
          data={characters.map(char => ({ label: char.name, value: char.name }))}
          onChange={e => setFieldValue('character', e.currentTarget.value)}
          value={values.character}
        />
        <Spacing appearance='small'/>
        <Input
          name='file'
          label='ANEXE O SEU CURRÍCULO'
          type='file'
          onChange={e => setFieldValue('file', e.target.files)}
        />
        <Spacing appearance='xx-small'/>
        <Textarea
          placeholder='Escreva aqui o resumo'
          name='resume'
          label='UM RESUMO DA SUA CARREIRA ARTISTICA'
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Spacing appearance='medium'/>
        <div className={styles['button-container']}>
          <Button type='submit' className={styles.button} >
            Enviar
          </Button>
        </div>
      </form>
    </Layout>
  )
}

export default Register