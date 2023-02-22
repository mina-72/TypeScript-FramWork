import { AxiosPromise, AxiosResponse } from "axios"

interface ModelAttributes<T> {
    set (value: T): void;
    getAll ():T;
    get <K extends keyof T>(key: K): T[K]
}

interface Sync<T> {
    fetch(id: number): AxiosPromise 
    save(data: T): AxiosPromise
}

interface Events {
    on (eventName: string, callback:() => void): void;
    trigger (eventName: string): void;
}

interface HasId {
    id?: number;
}

export class Model<T extends HasId> {
    constructor ( private attributes: ModelAttributes<T>,
        private sync: Sync<T>,
        private events: Events) {}

    // use get until we don't use "user.events.on()" in index.ts file, and write just "user.on()"
    get on() {
        return this.events.on
    }

    get trigger() {
        return this.events.trigger
    }

    get get() {
        return this.attributes.get
    }

    set (update: T): void {
        this.attributes.set(update)
        this.events.trigger('change')
    }

    fetch(): void{
       const id= this.get('id')

       if ( typeof id !== 'number') {
        throw new Error('can not fetch without id')
       }

       this.sync.fetch(id).then((response: AxiosResponse): void => {
            this.set(response.data)
       })
    }

    save(): void {
        this.sync.save(this.attributes.getAll())
        .then((response: AxiosResponse): void => {
            this.trigger('save')
        })
        .catch(() => {
            this.trigger('error')
        })
    }
}