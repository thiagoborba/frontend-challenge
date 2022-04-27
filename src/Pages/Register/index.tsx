import React from 'react';
import { Box, Input, Layout, Spacing, Title, Select, Textarea, Button } from '../../Components';
import { GlobalContext } from '../../Context';
import styles from './styles.module.scss';
import { useFormik, FormikErrors } from 'formik'
import * as Yup from 'yup';
import { EMAIL_REGEX, ERROR_DEFAULT } from '../../constants';

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

type Values = typeof INITIAL_VALUES

const validate = (values: Values) => {
  const errors: FormikErrors<Values> = {};

  if (!values.email) errors.email = ERROR_DEFAULT
  else if (!EMAIL_REGEX.test(values.email.toLowerCase()))
    errors.email = "E-mail inválido";

  return errors;
};

export const Register: React.FC = () => {
  const { state: { characters } } = GlobalContext()

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(ERROR_DEFAULT),
    date: Yup.string().required(ERROR_DEFAULT),
    phone: Yup.string().required(ERROR_DEFAULT),
    password: Yup.string().required(ERROR_DEFAULT),
    Rpassword: Yup.string().required(ERROR_DEFAULT),
    character: Yup.string().required(ERROR_DEFAULT),
    file: Yup.mixed().required(ERROR_DEFAULT),
    resume: Yup.string().required(ERROR_DEFAULT)
  });

  const { values, handleBlur, handleChange, setFieldValue, handleSubmit, errors, submitCount }  = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: (values) => console.log(values),
    validate,
    validationSchema
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
            errorMessage={submitCount && errors.name}
          />
          <Input
            name='date'
            value={values.date}
            label='DATA DE NASCIMENTO'
            type='date'
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={submitCount && errors.date}
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
            errorMessage={submitCount && errors.email}
          />
          <Input
            name='phone'
            value={values.phone}
            label='TELEFONE'
            type='tel'
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={submitCount && errors.phone}
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
            errorMessage={submitCount && errors.password}
          />
          <Input
            name='Rpassword'
            label='CONFIRME SUA SENHA'
            type='password'
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={submitCount && errors.Rpassword}
          />
        </Box>
        <Spacing appearance='medium'/>
        <Title color='lightSolid' as='h5'>
          Sobre o seu contato com Star Wars
        </Title>
        <Spacing appearance='xx-small'/>
        <Select
          name='character'
          label='QUAL SEU PERSONAGEM FAVORITO?'
          data={characters.map(char => ({ label: char.name, value: char.name }))}
          onChange={e => setFieldValue('character', e.currentTarget.value)}
          value={values.character}
          errorMessage={submitCount && errors.character}
        />
        <Spacing appearance='small'/>
        <Input
          name='file'
          label='ANEXE O SEU CURRÍCULO'
          type='file'
          onChange={e => setFieldValue('file', e.target.files)}
          errorMessage={submitCount && errors.file}
        />
        <Spacing appearance='xx-small'/>
        <Textarea
          placeholder='Escreva aqui o resumo'
          name='resume'
          label='UM RESUMO DA SUA CARREIRA ARTISTICA'
          onChange={handleChange}
          onBlur={handleBlur}
          errorMessage={submitCount && errors.resume}
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