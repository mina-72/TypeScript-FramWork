import { User } from "./models/User";

const user = new User({ name: 'mina', age: 28 });

(user.set({ name : 'reza', age: 9 }))

console.log(user.get('name'))
console.log(user.get('age'))

user.on('change', () => {})
console.log(user)