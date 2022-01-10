import { useCallback, useEffect } from "preact/hooks";
import { EVENTS } from "../../config/SocketEvents";
import { socket, useReduce } from "../../context/socket";
import toast from "react-hot-toast";

function Listeners() {
  const { dispatch } = useReduce();
  const handleNewVoting = useCallback((payload) => {
    dispatch({
      type: EVENTS.LISTENERS.NEW_VOTING_CARD,
      payload: payload,
    });
  }, []);

  const handleNewClient = useCallback((payload) => {
    dispatch({
      type: EVENTS.LISTENERS.NEW_CLIENT,
      payload,
    });
  }, []);

  const handleDisconnectedUser = useCallback((payload) => {
    console.log('entrei q', payload)
    toast(
      `Usuário disconectou da plataforma! Até mais ${payload.username}`,
      { duration: 3000 }
    );
    dispatch({
      type: EVENTS.LISTENERS.USER_DISCONNECTED,
      payload: {username : payload.username},
    });
    
  }, []);

  const handleConnectedClients = useCallback((payload) => {
    dispatch({
      type: EVENTS.LISTENERS.CONNECTED_CLIENTS,
      payload,
    });
  }, []);

  const handleUpdateCards = useCallback((payload) => {
    dispatch({
      type: EVENTS.LISTENERS.UPDATE_CARDS,
      payload: { cards: payload },
    });
  }, []);

  const handleUserVoted = useCallback((payload) => {
    dispatch({
      type: EVENTS.LISTENERS.ALL_USERS_VOTED,
      payload,
    });
  });

  const handleClosedtab = useCallback((e) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (process.env.NODE_ENV === "development") {
      localStorage.removeItem("user");
    }
    dispatch({
      type: EVENTS.EMITTERS.USER_DISCONNECTED,
      payload: user,
    });
    // dispatch({
    //   type: EVENTS.LISTENERS.UPDATE_CARDS,
    //   payload: { cards: payload },
    // });
  }, []);
  const handleUpdateUsers = useCallback((payload) => {
    dispatch({
      type: EVENTS.LISTENERS.UPDATE_USERS,
      payload,
    });
  }, []);
  const handleNotifyShowVotes = useCallback(() => {
    dispatch({
      type: EVENTS.LISTENERS.NOTIFY_SHOW_VOTES,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', handleClosedtab)
    socket.on(EVENTS.LISTENERS.NEW_VOTING_CARD, handleNewVoting);
    socket.on(EVENTS.LISTENERS.NEW_CLIENT, handleNewClient);
    socket.on(EVENTS.LISTENERS.CONNECTED_CLIENTS, handleConnectedClients);
    socket.on(EVENTS.LISTENERS.UPDATE_CARDS, handleUpdateCards);
    socket.on(EVENTS.LISTENERS.USER_DISCONNECTED, handleDisconnectedUser);
    socket.on(EVENTS.LISTENERS.UPDATE_USERS, handleUpdateUsers);
    socket.on(EVENTS.LISTENERS.ALL_USERS_VOTED, handleUserVoted);
    socket.on(EVENTS.LISTENERS.NOTIFY_SHOW_VOTES, handleNotifyShowVotes);

    return () => {
      window.removeEventListener('beforeunload', handleClosedtab)
      socket.off(EVENTS.LISTENERS.NEW_VOTING_CARD, handleClosedtab);
      socket.off(EVENTS.LISTENERS.ALL_USERS_VOTED, handleUserVoted);
      socket.off(EVENTS.LISTENERS.UPDATE_USERS, handleUpdateUsers);
      socket.off(EVENTS.LISTENERS.USER_DISCONNECTED, handleDisconnectedUser);
      socket.off(EVENTS.LISTENERS.USER_VOTED, handleUserVoted);
      socket.off(EVENTS.LISTENERS.NEW_CLIENT, handleNewClient);
      socket.off(EVENTS.LISTENERS.CONNECTED_CLIENTS, handleNewClient);
      socket.off(EVENTS.LISTENERS.UPDATE_CARDS, handleUpdateCards);
      socket.off(EVENTS.LISTENERS.NOTIFY_SHOW_VOTES, handleNotifyShowVotes);
    };
  }, [socket]);
  return null;
}

export default Listeners;
