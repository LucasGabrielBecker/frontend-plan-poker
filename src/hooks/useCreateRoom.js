import env from "../env"

export default async function useCreateRoom(cards) {
	const res = await fetch(`${env.BACKEND_URL}/rooms/create`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			cards: cards ? cards : [],
		}),
	})
	const data = await res.json()
	if (!data.ok) {
		return {
			error: data.msg,
			data: null,
		}
	}

	return {
		error: null,
		data,
	}
}
