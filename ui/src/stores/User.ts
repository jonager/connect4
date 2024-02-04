import { writable } from 'svelte/store'

const userID = writable<null | number>(null)
const isLoggedIn = writable(false)

export { isLoggedIn, userID }
