import {z} from 'zod'
import 'dotenv/config'

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: z.coerce.number().default(3333),
    REDIS_URL: z.string().url()
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false) {
    console.log('Invalid Enviroment Variables', _env.error.format())

    throw new Error('Invalid Enviroment Variables')
}

export const env = _env.data