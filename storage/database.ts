import mysql, { Pool } from 'mysql';

export type QueryParams = Array<string | number | null>;

let pool: Pool | null = null;

const getPool = (): Pool => {
    if (pool) {
        return pool;
    }

    pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        connectionLimit: 30,
        debug: false,
    });

    return pool;
};

export function executeSelect<T>(
    query: string,
    params: QueryParams = []
): Promise<T[]> {
    return new Promise((resolve, reject) => {
        getPool().getConnection((error, connection) => {
            if (error) {
                reject(error);
            }

            connection.query(query, params, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    });
}

export async function executeQuery(
    query: string,
    params: QueryParams = []
): Promise<void> {
    await executeSelect(query, params);
}
