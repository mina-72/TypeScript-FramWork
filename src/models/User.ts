interface UserProps {
    name?: string,
    age?: number
}

type Callback = () => void

export class User {
    events: { [key: string]: Callback[] } = {}
    constructor (private data: UserProps) {}

    get(PropName: string): (string | number) {
        return this.data[PropName]
    }

    set(update: UserProps): void {
        Object.assign(this.data, update)
    }

    on (eventName: string, callback: Callback): void {
        const handler = this.events[eventName] || []
        handler.push(callback)
        this.events[eventName] = handler
    }
}