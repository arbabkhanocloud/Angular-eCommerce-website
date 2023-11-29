import {
  MetaReducer,
  ActionReducer,
  ActionReducerMap,
  Action,
} from '@ngrx/store';

function logger<State>(
  reducer: ActionReducer<State, Action>,
): ActionReducer<State, Action> {
  return (state: State | undefined, action: Action): State => {
    // console.log('Action:', action);
    // console.log('Previous state:', state);

    const nextState = reducer(state as State, action);

    // console.log('Next state:', nextState);

    return nextState;
  };
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface State {}

export const reducers: ActionReducerMap<State> = {};

export const metaReducers: MetaReducer<State>[] = [logger];
