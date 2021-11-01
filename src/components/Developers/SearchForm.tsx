import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

type Inputs = {
  searchUser: string;
  showUsers: string;
};

type PropsType = {
  setTerm: (term: string) => void;
  toggleShowFriends: (showFriends: boolean | string) => void;
  term?: string | null;
  showFriend?: boolean | null;
};

const SearchUserForm: React.FC<PropsType> = ({ setTerm, toggleShowFriends, term, showFriend }) => {
  const { handleSubmit, setValue, control } = useForm<Inputs>();
  const dispatch = useDispatch();
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
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Controller
          name='searchUser'
          control={control}
          render={({ field }) => <TextField {...field} label='Search field' type='search' />}
        />

        <FormControl sx={{ width: 150 }} variant='outlined'>
          <InputLabel htmlFor='Show developers'>Show developers</InputLabel>
          <Controller
            name='showUsers'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select value={value} onChange={onChange} label='Show developers'>
                <MenuItem value='All'>All</MenuItem>
                <MenuItem value='Only followed'>Only followed</MenuItem>
                <MenuItem value='Only unfollowed'>Only unfollowed</MenuItem>
              </Select>
            )}
            defaultValue='All'
          />
        </FormControl>
      </Box>
      <Button type='submit' variant='outlined' sx={{ marginTop: '10px' }}>
        Submit
      </Button>
    </form>
  );
};

export default SearchUserForm;
