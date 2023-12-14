/* eslint-disable no-underscore-dangle */
import { IBoard } from 'src/types/board';
import BoardCard from './boardCard';

function BoardList({ cards }: { cards: IBoard[] }) {
    return (
        Array.isArray(cards) &&
        cards.map((card) => {
            return <BoardCard id={card._id} key={card._id} text={card.name} />;
        })
    );
}

export default BoardList;
