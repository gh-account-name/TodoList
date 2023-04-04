import * as Yup from 'yup';

export const VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string().required('Укажите название'),
  info: Yup.string().required('Опишите таску'),
  isImportant: Yup.boolean(),
  isDone: Yup.boolean(),
});
