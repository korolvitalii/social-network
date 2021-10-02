import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  searchUser: string;
  showUsers: string;
  exampleRequired: string;
};

type PropsType = {
  setTerm: (term: string) => void;
  toggleShowFriends: (showFriends: boolean | string) => void;
  dispatch: any;
};

const SearchUserForm: React.FC<PropsType> = ({ setTerm, toggleShowFriends, dispatch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.showUsers === 'Only followed') {
      dispatch(toggleShowFriends(true));
    } else if (data.showUsers === 'Only unfollowed') {
      dispatch(toggleShowFriends(false));
    } else {
      dispatch(toggleShowFriends(''));
    }
    dispatch(setTerm(data.searchUser));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('searchUser')} placeholder='Search' />
      <div>
        <select {...register('showUsers')}>
          <option value='All'>All</option>
          <option value='Only followed'>Only followed</option>
          <option value='Only unfollowed'>Only unfollowed</option>
        </select>
      </div>
      <input type='submit' />
    </form>
  );
};

export default SearchUserForm;
