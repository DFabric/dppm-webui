import { writable, derived } from 'svelte/store';

// the currently displayed path in the navbar
export const pathNames = writable(['DPPM']);

// All possible actions to be associated with a path member
export const pathActions = writable({});

export const path = derived([pathNames, pathActions], ([names, actions]) => {
    let out = [];
    names.forEach(name => {
        const action = actions[name] || (
            () => console.error(`no action associated with path member "${name}"`)
        );
        out.push({ name, action });
    });
    return out;
});
