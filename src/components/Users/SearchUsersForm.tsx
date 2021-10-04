import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  searchUser: string;
  showUsers: string;
};

type PropsType = {
  setTerm: (term: string) => void;
  toggleShowFriends: (showFriends: boolean | string) => void;
  dispatch: any;
  term?: string | null;
  showFriend?: boolean | null;
};

const SearchUserForm: React.FC<PropsType> = ({
  setTerm,
  toggleShowFriends,
  term,
  showFriend,
  dispatch,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (term) {
      setValue('searchUser', term);
    }
    if (showFriend) {
      setValue('showUsers', String(showFriend));
    }
  }, []);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data.showUsers);
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
