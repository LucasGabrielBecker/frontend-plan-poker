export const EVENTS = {
	EMITTERS: {
		CONNECTION: 'connection',
		DISCONNECT: 'disconnect',
		REGISTER: 'register',
		GET_CONNECTED_CLIENTS: 'get_connected_clients',
		SET_VOTING_CARD: 'set_voting_card',
		VOTE: 'vote',
		USER_DISCONNECTED: 'user_disconnected',
		SHOW_VOTES: 'show_votes'
	},
	LISTENERS: {
		CONNECTED_CLIENTS: 'connected_clients',
		NEW_CLIENT: 'new_client',
		UPDATE_CARDS: 'update_cards',
		NEW_VOTING_CARD: 'new_voting_card',
		USER_DISCONNECTED: 'user_disconnected',
		UPDATE_CARDS: 'update_cards',
		USER_VOTED: 'user_voted',
		UPDATE_USERS: 'update_users',
		ALL_USERS_VOTED: 'all_users_voted',
		NOTIFY_SHOW_VOTES: 'notify_show_votes'
	}
}
