import mariadb, { Connection } from 'mariadb';

type DynamicValues = Array<string | number | null>;

let connection: Connection;

let retries: number = 0;
const maxRetries = 3;

async function getConnection(): Promise<Connection> {
    if (connection && connection.isValid()) {
        return connection;
    }

    connection = await mariadb.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    return connection;
}

export async function executeQueryWithCatchAndRetry<R = any>(
    query: string,
    dynamicValues: DynamicValues
): Promise<R> {
    const connection = await getConnection();

    try {
        const result = await connection.query(query, dynamicValues);

        retries = 0;

        return result as R;
    } catch (error) {
        connection.destroy();

        if (retries >= maxRetries) {
            throw error;
        }

        retries++;

        return executeQueryWithCatchAndRetry<R>(query, dynamicValues);
    }
}

export async function executeSelect<T>(
    query: string,
    dynamicValues: DynamicValues = []
): Promise<T[]> {
    return await executeQueryWithCatchAndRetry<T[]>(query, dynamicValues);
}

export async function executeQuery(
    query: string,
    dynamicValues: DynamicValues = []
): Promise<void> {
    await executeQueryWithCatchAndRetry(query, dynamicValues);
}
