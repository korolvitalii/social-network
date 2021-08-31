import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';

import classes from './Users.module.css';
import userIcon from '../../assets/images/User-Icon.jpg';
import Preloader from '../common/Preloader/Preloader';
import { RootStateType, UserType } from '../../types/types';
import { followUserAction, getUsers, unfollowUserAction } from '../../redux/actions/UsersActions';
import { initialStateType } from '../../redux/reducers/UsersReducers';

type PropsType = {
  toggleFollowingProgress: any;
  usersPage: initialStateType;
  isFollowingProgress: boolean;
  isFetch: boolean;
};

const Users: React.FC<PropsType> = (props) => {
  const dispatch = useDispatch();
  // debugger;
  const {
    toggleFollowingProgress,
    usersPage: { pageSize, pagesCount, users },
    isFollowingProgress,
    isFetch,
  } = props;

  const { isAuth } = useSelector((state: RootStateType) => state.auth);

  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    dispatch(getUsers(currentPage, pageSize));
  }, []);

  const onChangePageClick = ({ selected }: number | any) => {
    setCurrentPage(selected);
    dispatch(getUsers(selected + 1, pageSize));
  };

  const follow = (id: number) => {
    dispatch(toggleFollowingProgress(true));
    dispatch(followUserAction(id));
  };

  const unfollow = (id: number) => {
    dispatch(toggleFollowingProgress(true));
    dispatch(unfollowUserAction(id));
  };

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
              <button disabled={isFollowingProgress} onClick={() => unfollow(id)}>
                UNFOLLOW
              </button>
            ) : (
              <button disabled={isFollowingProgress} onClick={() => follow(id)}>
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
      {isFetch && <Preloader />}
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
      <div>{usersElements}</div>
    </>
  );
};

export default Users;
