import { useEffect, useRef } from 'react';
import { useAllBoards, useBoardId } from 'hooks';
import { useEffect } from 'react';
import { useAllBoards, useBoardId, useOneBoardLoading } from 'hooks';
import BoardButton from 'components/BoardButton/BoardButton';
import { List } from './ButtonListStyled';
import { getBoardById } from 'redux/board/operations';
import { useDispatch } from 'react-redux';
import useDraggableScroll from 'use-draggable-scroll';
import Loader from 'components/Loader/Loader';

function ButtonList() {
  const allBoards = useAllBoards();
  const dispatch = useDispatch();
  const boardID = useBoardId();
  const ref = useRef(null);
  const { onMouseDown } = useDraggableScroll(ref, { direction: 'vertical' });
  const isLoading = useOneBoardLoading();

  useEffect(() => {
    if (allBoards.length !== 0 && boardID) {
      dispatch(getBoardById(boardID));
    }
  }, [allBoards, boardID, dispatch]);

  return (
    <List ref={ref} onMouseDown={onMouseDown}>
  return isLoading ? (
    <Loader />
  ) : (
    <List>
      {allBoards.length !== 0 &&
        allBoards.map(({ _id, title, icon, active }) => (
          <BoardButton
            key={_id}
            name={title}
            id={_id}
            icon={icon}
            isActive={active}
          />
        ))}
    </List>
  );)
}

export default ButtonList;
