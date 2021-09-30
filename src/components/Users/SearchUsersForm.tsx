import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Dispatch } from 'redux';

type Inputs = {
  searchUser: string;
  exampleRequired: string;
};

type PropsType = {
  setTerm: (term: string) => void;
  dispatch: any;
};

const SearchUserForm: React.FC<PropsType> = ({ setTerm, dispatch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => dispatch(setTerm(data.searchUser));
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('searchUser')} />
      {errors.exampleRequired && <span>This field is required</span>}
      <input type='submit' />
    </form>
  );
};

export default SearchUserForm;
