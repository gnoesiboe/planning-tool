export async function executeGetRequest<R = any>(url: string): Promise<R> {
    const response = await fetch(url);

    return (await response.json()) as R;
}

export async function executePostRequest(
    url: string,
    body: Object
): Promise<void> {
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
}

export async function executeDeleteRequest(url: string): Promise<void> {
    await fetch(url, {
        method: 'DELETE',
    });
}
