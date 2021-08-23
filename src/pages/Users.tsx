import React, { useState } from 'react';
import { RootStateType, UserType, ServerData } from '../types/types';
import {
  getTotalCount,
  setUsers,
  toggleFollowUnfollow,
  setPagesCount,
} from '../redux/actions/UsersActions';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Users.module.css';
import axios from 'axios';
import { useEffect } from 'react';
import userIcon from '../assets/images/User-Icon.jpg';
import Preloader from '../components/common/Preloader/Preloader';
import ReactPaginate from 'react-paginate';
import { NavLink } from 'react-router-dom';

const Users = () => {
  const dispath = useDispatch();
  const { users, pageSize, pagesCount } = useSelector((state: RootStateType) => state.usersPage);

  const [activePage, setActivePage] = useState<number>(1);
  const [isFetch, setIsFetch] = useState<boolean>(true);

  useEffect(() => {
    setIsFetch(true);
    axios
      .get<ServerData>(
        `https://social-network.samuraijs.com/api/1.0/users?count=${pageSize}&page=${activePage}`,
      )
      .then((response) => {
        setIsFetch(false);
        dispath(setUsers(response.data.items));
        dispath(getTotalCount(response.data.totalCount));
        dispath(setPagesCount(response.data.totalCount, pageSize));
      });
  }, []);

  const onChangePageClick = ({ selected }: number | any) => {
    setActivePage(selected);
    setIsFetch(true);
    axios
      .get<ServerData>(
        `https://social-network.samuraijs.com/api/1.0/users?count=${pageSize}&page=${selected + 1}`,
      )
      .then((response) => {
        // debugger;
        setIsFetch(false);
        dispath(setUsers(response.data.items));
      });
  };

  const onClickButton = (id: number): void => {
    dispath(toggleFollowUnfollow(id));
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
            <button onClick={() => onClickButton(id)}>{followed ? 'Follow' : 'Unfollow'}</button>
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
