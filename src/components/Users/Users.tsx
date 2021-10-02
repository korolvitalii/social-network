import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
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
import SearchUserForm from './SearchUsersForm';
import classes from './Users.module.css';

type PropsType = {};

const Users: React.FC<PropsType> = (props) => {
  const dispatch = useDispatch();
  const users = useSelector(getUsersFromState);
  const pageSize = useSelector(getPageSize);
  const pagesCount = useSelector(getPagesCount);
  const isFollowingProgress = useSelector(getIsFollowingProgress);
  const errors = useSelector(getErrors);
  const term = useSelector(getTerm);
  const showFriends = useSelector(getShowFriends);

  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    dispatch(getUsers(currentPage, pageSize, term, showFriends));
  }, [currentPage, dispatch, pageSize, term, showFriends]);

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
      <div key={id} className={classes.userContainer}>
        <div className={classes.photoAndButton}>
          <div>
            <NavLink to={path}>
              <img className={classes.userPhoto} src={small ? small : userIcon} alt='' />
            </NavLink>
          </div>
          <div>
            {followed ? (
              <button
                disabled={isFollowingProgress}
                onClick={() => {
                  unfollow(id);
                }}>
                UNFOLLOW
              </button>
            ) : (
              <button
                disabled={isFollowingProgress}
                onClick={() => {
                  follow(id);
                }}>
                FOLLOW
              </button>
            )}
          </div>
        </div>
        <div className={classes.userInfo}>
          <div>{name}</div>
          <div>{status}</div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div>
        <ReactPaginate
          disableInitialCallback={true}
          initialPage={0}
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
          toggleShowFriends={toggleShowFriends}
          dispatch={dispatch}
        />
      </div>
      <ShowErrorModal errors={errors} resetError={resetError} />
      <div>{usersElements}</div>
    </>
  );
};

export default Users;
