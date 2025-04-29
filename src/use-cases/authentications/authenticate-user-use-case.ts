import {compare} from 'bcrypt'
// import {sign} from 'jsonwebtoken'
import { UserRepositoryInterface } from '@/repositories/interface/user-repository-interface'

interface AuthenticateRequest {
    email: string
    password: string
}

const JWTSecret = 'HH22@77&JHSJHHS09.K-,HHJDSD+SD'

export class AuthenticateUserUseCase {
    constructor(private userRepository: UserRepositoryInterface) {}

    async execute({email, password}: AuthenticateRequest) {

        
        const user = await this.userRepository.findByEmail(email)

        if(!user) {
            throw new Error('Email or Password Incorrect.')
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new Error('Email or Password Incorrect.')
        }

        // const token = sign(
        //     {
        //     userId: user.id
        // }, JWTSecret, 
        // {
        //     subject: user.id,
        //     expiresIn: '24H'
        // })

        return {user}

    }
}

export { JWTSecret }