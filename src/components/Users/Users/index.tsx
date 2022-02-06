import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';
import { actions as errorActions } from '../../../redux/actions/ErrorsActions';
import { actions, getUsers } from '../../../redux/actions/UsersActions';
import { selectErrors } from '../../../redux/selectors/profile-selectors';
import {
  selectPagesCount,
  selectPageSize,
  selectShowFriends,
  selectTerm,
  selectUsers,
} from '../../../redux/selectors/user-selectors';
import { UserType } from '../../../types/types';
import ShowErrorModal from '../../common/ErrorModal';
import User from '../User';
import SearchUserForm from '../SerchForm';
import { Wrapper } from './styles';

const Developers: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const pageSize = useSelector(selectPageSize);
  const pagesCount = useSelector(selectPagesCount);
  const errors = useSelector(selectErrors);
  let term = useSelector(selectTerm);
  let showFriends = useSelector(selectShowFriends);

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
      setCurrentPage(currentPageHook);
      setQuery({ currentPage: currentPageHook });
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
    <Wrapper>
      <div className='pagination'>
        <ReactPaginate
          disableInitialCallback={true}
          //@ts-ignore
          initialPage={(currentPageHook - 1) as number | undefined}
          pageCount={pagesCount}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={onChangePageClick}
          containerClassName='pagination'
          activeClassName='active'
          pageLinkClassName='pageLink'
          breakLinkClassName='pageLink'
          nextLinkClassName='pageLink'
          previousLinkClassName='pageLink'
          pageClassName='pageItem'
          breakClassName='pageItem'
          nextClassName='pageItem'
          previousClassName='pageItem'
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
          <User {...user} key={user.id} />
        ))}
      </div>
    </Wrapper>
  );
};

export default Developers;
