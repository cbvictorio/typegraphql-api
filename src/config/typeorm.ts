import { createConnection } from 'typeorm'
import path from 'path'

export async function connect() {
    await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '12345',
        database: 'typescript',
        synchronize: true,
        entities: [
            path.join(__dirname, '../entity/**/**.ts')
        ]
    });

    console.log('DB is connected!');
}