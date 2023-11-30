import { AnyAction } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import Loader from 'src/component/loader';
import { useAppDispatch, useAppSelector } from 'src/store/createStore';
import { IAppState } from 'src/types/store';

type IFetchData<T> = {
    selector: (state: T) => {
        isFetched: boolean;
        isLoading: boolean;
        data?: unknown;
    };
    action: () => AnyAction;
};

const withReduxDataFetching = (
    fetchArr: IFetchData<IAppState>[],
    hardReload: boolean = false
) =>
    function WithDataFetch(WrappedComponent: React.ComponentType) {
        const dispatch = useAppDispatch();
        const state: IAppState = useAppSelector(
            (rootState: IAppState) => rootState
        );
        const fetchData = async () => {
            const remainingPromises = fetchArr
                .filter(({ selector }) => {
                    const { isFetched } = selector(state);
                    return hardReload || !isFetched;
                })
                .map(({ action }) => dispatch(action()));
            console.log(remainingPromises);
            await Promise.all(remainingPromises);
        };

        const actionsFetchCondition = fetchArr.map(({ selector }) => {
            const { isLoading } = selector(state);
            return isLoading;
        });

        console.log(actionsFetchCondition);

        useEffect(() => {
            fetchData();
        }, []);

        const isLoading = actionsFetchCondition.some((condition) => condition);
        console.log(isLoading);

        return isLoading ? <Loader /> : <WrappedComponent />;
    };

export default withReduxDataFetching;
