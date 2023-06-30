import { DragDropContext } from '@hello-pangea/dnd';
import { useState, useEffect } from 'react';

import AddColumnButton from 'components/AddColumnButton';
import { useBoard, useOneBoardLoading } from 'hooks';
import Column from 'components/Column';
import { Section } from './ScreenPage.styled';

function ScreenPage() { 
  const oneBoard = useBoard();
  console.log(oneBoard.board.board[0].columns)
  const [elements, setElements] = useState([]);
  const isOneBoardLoading = useOneBoardLoading();
  const [isBoard, setIsBoard] = useState(false);

  useEffect(() => {
    if (oneBoard.board.length !== 0) {
      setIsBoard(true);
    }
  }, [oneBoard.board, setIsBoard, oneBoard]);

  useEffect(() => {
    if (isBoard) {    
      setElements(oneBoard.board.board[0].columns);
    }
  }, [isBoard, oneBoard.board.board, oneBoard.board.columns]);

  const removeFromList = (list, index) => {
    const result = list;
    console.log('index', list);
    console.log('removed', result.tasks);
    const [removed] = result.tasks.splice(index, 1);

    return [removed, result];
  };

  const addToList = (list, index, element) => {
    const result = list;
    list.tasks.splice(index, 0, element);
    return result;
  };

  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }
    const listCopy = { ...elements };
    console.log(listCopy);
    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    console.log(destinationList);
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );
    // console.log('listCopy', listCopy);
    setElements(Object.values(listCopy));
    // dispatch(setBoard(elements));
  };
  // console.log('elements2', elements);
  return (
    isBoard &&
    !isOneBoardLoading && (
      <>
        <header>
          <h2>{oneBoard.board.board[0].title}</h2>
          <p>Filters</p>
        </header>
        <Section>
          <DragDropContext onDragEnd={onDragEnd}>
            {elements.length !== 0 &&
              elements.map(({ title, _id, tasks }, columnIndex) => (
                <Column
                  cards={tasks}
                  columnTitle={title}
                  columnId={_id}
                  key={_id}
                  prefix={columnIndex}
                />
              ))}
          </DragDropContext>
          <AddColumnButton />
        </Section>
      </>
    )
  );
}

export default ScreenPage;
