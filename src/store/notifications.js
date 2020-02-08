import { writable } from 'svelte/store';
import uuid from 'uuid/v1';
import dedent from 'dedent';

export const notifications = writable([]);

class MalformedNotification extends Error {
    constructor(obj, missing) {
        super(dedent`
      Malformed notification!
      Expected attribute ${missing} to be present on the notification object,
      but received:
        ${JSON.stringify(obj, null, 2)}
    `);
    }
}

// throws a MalformedNotification when an invalid message is received.
const validateMessage = message => {
    if (!message.message) throw new MalformedNotification(message, 'message');
};

// Add a notification to be displayed. The specified message may either be a
// plain string or an object with the keys "message" and "kind". An optional
// attribute "timeout" may also be defined, which defaults to 5000 (ms). Its
// potential values are `false`, meaning 'never time out', or a nonzero
// numeric value, representing the number of milliseconds the notification
// should be displayed.
export const notify = message => {
    validateMessage(message);
    const time = timeoutFrom(message);
    const id = uuid();
    message.id = id;
    notifications.update(orig => (Array.isArray(orig) ? orig : []).concat([message]));
    if (time)
        setTimeout(() =>
            notifications.update(orig => {
                return orig.filter(e => {
                    if (e.id !== id) {
                        return true;
                    } else {
                        console.log(`filtering out ${JSON.stringify(e)}`);
                        return false;
                    }
                });
            }), time);
};

// The default time before a notification should be dismissed automatically.
export const timeout = 5000;

const timeoutFrom = notif => {
    // If a timeout is specified return that
    if (notif && notif.timeout)
        return notif.timeout;
    // If the timeout is specified as "false", don't ever timeout.
    if (notif && (notif.timeout == false))
        return false;
    // default case: return the global default timeout
    return timeout;
};

// setTimeout(() => {
//   notify({ message: "Test alert", kind: "info" })
//   notify({ message: "Test never times out alert", kind: "info", timeout: false })
//   notify({ message: "Test long alert", kind: "info", timeout: 10000 })
//   notify("invalid notification")
// }, 1000);
