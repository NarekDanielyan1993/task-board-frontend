import { IBoard } from 'src/types/board';
import BoardCard from './boardCard';

function BoardList({ cards }: { cards: IBoard[] }) {
    return (
        Array.isArray(cards) &&
        cards.map((card) => {
            return <BoardCard id={card.id} key={card.id} text={card.name} />;
        })
    );
}

export default BoardList;
