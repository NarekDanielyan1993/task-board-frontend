import { createContext, useContext } from 'react';
import type { IBoardsContext } from 'src/types/context';

const BoardsContext = createContext<IBoardsContext | undefined>(undefined);

function BoardsProvider({
    children,
    values,
}: {
    values: IBoardsContext;
    children: React.ReactNode;
}) {
    return (
        <BoardsContext.Provider value={values}>
            {children}
        </BoardsContext.Provider>
    );
}

const useBoardsContext = () => {
    const context = useContext(BoardsContext);
    if (context === undefined) {
        throw new Error(
            'useBoardsContext must be used within a BoardsContextProvider'
        );
    }
    return context;
};

export { BoardsProvider, useBoardsContext };
export default BoardsContext;
