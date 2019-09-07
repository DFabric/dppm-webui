import { writable } from 'svelte/store'

const DEFAULT_ACTIVE_MENU_ITEM = 'Applications'
export const activeMenuItem = writable(DEFAULT_ACTIVE_MENU_ITEM)
