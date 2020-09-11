import 'reflect-metadata'
import { startServer } from './app'
import { connect } from './config/typeorm' 

async function main() {
    await connect()
    const app = await startServer();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT);
    console.log(`Apollo server running on port ${PORT}`);
}

main();

