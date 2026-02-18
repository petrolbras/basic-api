import { Pool } from "pg"
import { DB_URI, NODE_ENV } from '../config/env.ts'

if(!DB_URI) {
    throw new Error('Please define the PostgreSQL_URI environment variable inside .env.<development/production>.local')
}

export const pool = new Pool({
    connectionString: DB_URI
})

export const connectToDatabase = async (): Promise<void> => {
    try {
        const client = await pool.connect()

        console.log(`Connected to database in ${NODE_ENV} mode`)

        client.release()
    } catch (error) {
        console.log('Error conecting the database', error)

        process.exit(1)
    }
}