import mariadb, { Pool, PoolConnection } from 'mariadb';

export type QueryParams = Array<string | number | null>;

const pool: Pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
});

export async function executeSelect<T>(
    query: string,
    params: QueryParams = []
): Promise<T[]> {
    let connection: PoolConnection | null = null;

    try {
        connection = await pool.getConnection();

        return await connection.query(query, params);
    } catch (error) {
        // @todo better error handling

        console.error(error);

        return [];
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

export async function executeQuery(
    query: string,
    params: QueryParams = []
): Promise<void> {
    await executeSelect(query, params);
}
