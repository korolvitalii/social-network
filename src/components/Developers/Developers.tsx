import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';
import { actions as errorActions } from '../../redux/actions/ErrorsActions';
import { actions, getUsers } from '../../redux/actions/UsersActions';
import { getErrors } from '../../redux/selectors/profile-selectors';
import {
  getPagesCount,
  getPageSize,
  getShowFriends,
  getTerm,
  getUsersFromState,
} from '../../redux/selectors/user-selectors';
import { UserType } from '../../types/types';
import ShowErrorModal from '../common/ErrorModal';
import Developer from './Developer';
import SearchUserForm from './SearchForm';
import classes from './Developers.module.css';

const Developers: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const users = useSelector(getUsersFromState);
  const pageSize = useSelector(getPageSize);
  const pagesCount = useSelector(getPagesCount);
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
      dispatch(toggleShowFriends(showFriends));
      setQuery({ friend: String(showFriends) });
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
      dispatch(setTerm(termQuery as string));
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

  const onChangePageClick = ({ selected }: { selected: number }): void => {
    const incSelected = selected + 1;
    setCurrentPage(incSelected);
    dispatch(getUsers(incSelected, pageSize, term, showFriends));
  };

  const toggleShowFriends = (flag: boolean | string) => dispatch(actions.toggleShowFriends(flag));
  const setTerm = (term: string) => dispatch(actions.setTerm(term));
  const resetError = () => dispatch(errorActions.resetError());

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
        />
      </div>
      <ShowErrorModal errors={errors} resetError={resetError} />
      <div>
        {users.map((user: UserType) => (
          <Developer {...user} />
        ))}
      </div>
    </div>
  );
};

export default Developers;
