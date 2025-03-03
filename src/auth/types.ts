import { User } from "src/users/entities/user.entity"

export type AuthResponse = { access_token: string}
export type UserProfile = Pick<User, 'username' | 'roles' | 'id'>