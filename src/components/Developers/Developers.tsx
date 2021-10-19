import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';
import userIcon from '../../assets/images/User-Icon.jpg';
import { actions as errorActions } from '../../redux/actions/ErrorsActions';
import { actions, followThunk, getUsers, unfollowThunk } from '../../redux/actions/UsersActions';
import { getErrors } from '../../redux/selectors/profile-selectors';
import {
  getIsFollowingProgress,
  getPagesCount,
  getPageSize,
  getShowFriends,
  getTerm,
  getUsersFromState,
} from '../../redux/selectors/user-selectors';
import { UserType } from '../../types/types';
import ShowErrorModal from '../common/ShowErrorModal';
import SearchUserForm from './SearchForm';
import classes from './Developers.module.css';
import { Box, Button, Typography } from '@mui/material';

const Users: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector(getUsersFromState);
  const pageSize = useSelector(getPageSize);
  const pagesCount = useSelector(getPagesCount);
  const isFollowingProgress = useSelector(getIsFollowingProgress);
  const errors = useSelector(getErrors);
  let term = useSelector(getTerm);
  let showFriends = useSelector(getShowFriends);

  const [query, setQuery] = useQueryParams({
    term: StringParam,
    friend: StringParam,
    currentPage: NumberParam,
  });

  const { term: termQuery, friend: friendQuery, currentPage: currentPageQuery } = query;
  const [currentPageHook, setCurrentPage] = useState(currentPageQuery);

  useEffect(() => {
    if (String(showFriends) !== friendQuery && friendQuery) {
      dispatch(toggleShowFriends(friendQuery));
      setQuery({ friend: String(friendQuery) });
    }
    if (String(showFriends) === '') {
      dispatch(toggleShowFriends(false));
      setQuery({ friend: 'false' });
    }
    if (String(showFriends) !== friendQuery && showFriends) {
      dispatch(toggleShowFriends(showFriends));
      setQuery({ friend: String(showFriends) });
    }

    if (term !== termQuery && term) {
      dispatch(setTerm(term));
      setQuery({ term: term });
    }

    if (term !== termQuery && termQuery) {
      dispatch(setTerm(termQuery as any));
      setQuery({ term: termQuery });
    }

    if (termQuery && term === '') {
      dispatch(setTerm(''));
      setQuery({ term: '' });
    }
    if (currentPageHook && currentPageHook !== currentPageQuery) {
      const decrementCurrentPage = currentPageHook + 1;
      setCurrentPage(decrementCurrentPage);
      setQuery({ currentPage: decrementCurrentPage });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showFriends, friendQuery, term, termQuery, currentPageHook, currentPageQuery]);

  useEffect(() => {
    dispatch(getUsers(currentPageHook, pageSize, term, showFriends));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageHook, pageSize, term, showFriends]);

  const onChangePageClick = ({ selected }: any) => {
    const incSelected = selected + 1;
    setCurrentPage(incSelected);
    dispatch(getUsers(incSelected, pageSize, term, showFriends));
  };

  const follow = (id: number) => {
    dispatch(followThunk(id));
  };
  const unfollow = (id: number) => {
    dispatch(unfollowThunk(id));
  };

  const toggleShowFriends = (flag: boolean | string) => dispatch(actions.toggleShowFriends(flag));
  const setTerm = (term: string) => dispatch(actions.setTerm(term));
  const resetError = () => dispatch(errorActions.resetError());

  const usersElements = users.map((user: UserType) => {
    const {
      id,
      name,
      followed,
      status,
      photos: { small },
    } = user;

    const path = `/profile/${id}`;

    return (
      <Box
        key={id}
        sx={{ display: 'flex', justifyContent: 'flex-start', padding: '20px', marginLeft: '20px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: 800,
            }}>
            <NavLink to={path}>
              <img className={classes.userPhoto} src={small ? small : userIcon} alt='' />
            </NavLink>
            {followed ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Button variant='outlined' sx={{ marginBottom: '10px', width: '100px' }}>
                  Message
                </Button>
                <Button
                  variant='outlined'
                  disabled={isFollowingProgress}
                  sx={{ width: '100px' }}
                  onClick={() => {
                    unfollow(id);
                  }}>
                  UNFOLLOW
                </Button>
              </Box>
            ) : (
              <Button
                variant='outlined'
                disabled={isFollowingProgress}
                sx={{ height: '40px', width: '100px' }}
                onClick={() => {
                  follow(id);
                }}>
                FOLLOW
              </Button>
            )}
          </Box>
          <Typography variant='h6' gutterBottom component='div'>
            {name}
          </Typography>
        </Box>
      </Box>
    );
  });

  return (
    <div>
      <div>
        <ReactPaginate
          disableInitialCallback={true}
          initialPage={currentPageHook as number | undefined}
          pageCount={pagesCount}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={onChangePageClick}
          containerClassName={classes.pagination}
          activeClassName={classes.active}
          pageLinkClassName={classes.pageLink}
          breakLinkClassName={classes.pageLink}
          nextLinkClassName={classes.pageLink}
          previousLinkClassName={classes.pageLink}
          pageClassName={classes.pageItem}
          breakClassName={classes.pageItem}
          nextClassName={classes.pageItem}
          previousClassName={classes.pageItem}
          previousLabel={<>&laquo;</>}
          nextLabel={<>&raquo;</>}
        />
      </div>
      <div>
        <SearchUserForm
          setTerm={setTerm}
          term={term}
          showFriend={!!friendQuery}
          toggleShowFriends={toggleShowFriends}
          dispatch={dispatch}
        />
      </div>
      <ShowErrorModal errors={errors} resetError={resetError} />
      <div>{usersElements}</div>
    </div>
  );
};

export default Users;
