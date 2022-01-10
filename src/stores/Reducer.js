import { EVENTS } from '../config/SocketEvents'
import { socket } from '../context/socket'
import toast from 'react-hot-toast'
import id from 'lodash.uniqueid'

export const reducer = (state, action) => {
	switch (action.type) {
		//emitters
		case EVENTS.EMITTERS.GET_CONNECTED_CLIENTS: {
			socket.emit(EVENTS.EMITTERS.GET_CONNECTED_CLIENTS)
			return state
		}
		case EVENTS.EMITTERS.SET_VOTING_CARD: {
			socket.emit(EVENTS.EMITTERS.SET_VOTING_CARD, action.payload)
			return state
		}
		case EVENTS.EMITTERS.USER_DISCONNECTED: {
			console.log(action.payload)
			socket.emit(EVENTS.EMITTERS.USER_DISCONNECTED, action.payload)
			return state
		}
		case EVENTS.EMITTERS.REGISTER: {
			const newUser = {
				...action.payload,
				id: id(action.payload.username)
			}
			localStorage.setItem('user', JSON.stringify(newUser))
			socket.emit(EVENTS.EMITTERS.REGISTER, newUser)
			return {
				...state,
				users: [...state.users, action.payload]
			}
		}
		case EVENTS.EMITTERS.SHOW_VOTES: {
			socket.emit(EVENTS.EMITTERS.SHOW_VOTES)
			return state
		}
		case EVENTS.EMITTERS.VOTE: {
			socket.emit(EVENTS.EMITTERS.VOTE, action.payload)
			return state
		}
		//listeners
		case EVENTS.LISTENERS.UPDATE_CARDS: {
			return {
				...state,
				cards: action.payload.cards,
				users: action.payload.users
			}
		}
		case EVENTS.LISTENERS.USER_VOTED: {
			return {
				...state,
				allUsersVoted: state.users.length === action.payload
			}
		}

		case EVENTS.LISTENERS.NEW_VOTING_CARD: {
			toast.dismiss()
			toast('Novo card em votação')
			return {
				...state,
				cards: [action.payload]
			}
		}

		case EVENTS.LISTENERS.NEW_CLIENT: {
			toast(`${action.payload.newUser} entrou`)
			return {
				...state,
				users: action.payload.connectedClients
			}
		}
		case EVENTS.LISTENERS.USER_DISCONNECTED: {
			console.log('dentro do reducer do user disconnceted')
			return {
				...state,
				users: state.users.filter(
					user => user.newUser !== action.payload.username
				)
			}
		}
		case EVENTS.LISTENERS.CONNECTED_CLIENTS: {
			return {
				...state,
				users: action.payload
			}
		}
		case EVENTS.LISTENERS.UPDATE_CARDS: {
			return {
				...state,
				cards: [...state.cards, ...action.payload]
			}
		}
		case EVENTS.LISTENERS.UPDATE_USERS: {
			return {
				...state,
				users: action.payload.users,
				usersAlreadyVoted: action.payload.usersAlreadyVoted
			}
		}
		case EVENTS.LISTENERS.ALL_USERS_VOTED: {
			return {
				...state,
				allUsersVoted: true
			}
		}
		case EVENTS.LISTENERS.NOTIFY_SHOW_VOTES: {
			return {
				...state,
				showVotes: true
			}
		}
		default: {
			return state
		}
	}
}
