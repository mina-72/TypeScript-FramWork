import { Model } from "./Model"
import { Attributes } from "./Attributes"
import { ApiSync } from "./ApiSync"
import { Eventing } from "./Eventing"

export interface UserProps {
    id?: number,
    name?: string,
    age?: number
}

const rootUrl= 'https://localhost:3000/users'
export class User extends Model<UserProps> {
    static buildUser(attrs: UserProps): User {
        return new User(
            new Attributes<UserProps>(attrs),
            new ApiSync<UserProps>(rootUrl),
            new Eventing()
        )
    }
}

const user = User.buildUser({})
user.get('name')