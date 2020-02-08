export default class Category {
    constructor(heading, action, subheadings = []) {
        this.heading = heading;
        this.action = action;
        this.subheadings = subheadings;
    }
}
