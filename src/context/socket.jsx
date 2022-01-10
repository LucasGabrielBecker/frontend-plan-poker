import { createContext } from "preact";
import { useContext, useReducer, useMemo } from "preact/hooks";
import { io } from "socket.io-client";
import env from "../env";
import { reducer } from "../stores/Reducer";

export const socket = io(env.BACKEND_URL, { user: localStorage.getItem("user") });
export const SocketContext = createContext({});

export const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export function useSocket() {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocket must be used within an SocketProvider");
  }

  return context;
}

export const ReducerContext = createContext({});
const reducerInitialState = {
  cards: null,
  users: [],
  allUsersVoted: false,
  usersAlreadyVoted: [],
  showVotes: false
};

export const ReducerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, reducerInitialState);
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);
  return (
    <ReducerContext.Provider value={contextValue}>
      {children}
    </ReducerContext.Provider>
  );
};

export function useReduce() {
  const { state, dispatch } = useContext(ReducerContext);

  if (!dispatch) {
    throw new Error("useReducer must be used within an ReducerProvider");
  }

  return { state, dispatch };
}
