import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

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
  const { register, handleSubmit, setValue, control } = useForm<Inputs>();

  useEffect(() => {
    if (term) {
      setValue('searchUser', term);
    }
    if (showFriend) {
      setValue('showUsers', String(showFriend));
    }
  }, [term, setValue, showFriend]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    debugger;
    if (data.showUsers === 'Only followed') {
      dispatch(toggleShowFriends(true));
    } else if (data.showUsers === 'Only unfollowed') {
      dispatch(toggleShowFriends(false));
    } else {
      dispatch(toggleShowFriends(''));
    }
    dispatch(setTerm(data.searchUser));
  };
  const [show, setShow] = React.useState('All');

  const handleChange = (event: SelectChangeEvent) => {
    debugger;
    setShow(event.target.value as string);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <input {...register('searchUser')} placeholder='Search' /> */}
      <Controller
        name='searchUser'
        control={control}
        render={({ field }) => <TextField {...field} label='Search field' type='search' />}
      />
      <Controller
        name='showUsers'
        control={control}
        render={({ field }) => (
          <>
            <InputLabel id='demo-simple-select-label'>Show users</InputLabel>
            <Select
              {...field}
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={show}
              onChange={handleChange}>
              <MenuItem value='All'>All</MenuItem>
              <MenuItem value='Only followed'>Only followed</MenuItem>
              <MenuItem value='Only unfollowed'>Only unfollowed</MenuItem>
            </Select>
          </>
        )}
      />

      {/* <div>
        <select {...register('showUsers')}>
          <option value='All'>All</option>
          <option value='Only followed'>Only followed</option>
          <option value='Only unfollowed'>Only unfollowed</option>
        </select>
      </div> */}
      <input type='submit' />
    </form>
  );
};

export default SearchUserForm;
