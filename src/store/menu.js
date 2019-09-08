import { writable } from 'svelte/store'

export const DEFAULT_ACTIVE_MENU_STATE = { item: 'Applications', depth: 0 }
export const activeMenuItem = writable(DEFAULT_ACTIVE_MENU_STATE)
