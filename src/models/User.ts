interface UserProps {
    name?: string,
    age?: number
}

export class User {
    constructor (private data: UserProps) {}

    get(PropName: string): (string | number) {
        return this.data[PropName]
    }

    set(update: UserProps): void {
        Object.assign(this.data, update)
    }
}