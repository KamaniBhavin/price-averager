const supabaseUrl = "https://vuqgjutvvcxphdhsglfi.supabase.co/rest/v1/products";
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1cWdqdXR2dmN4cGhkaHNnbGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY3ODI5NTQsImV4cCI6MTk4MjM1ODk1NH0.4zEPYeWOfAb3IzBg0ATajZvZy9xvdLYC46lG8f_1FtI';

export async function post<T>(body: T) {
    const response = await fetch(supabaseUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'apiKey': apiKey,
            'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify(body)
    })

    if (!response.ok) {
        throw new Error(`Cannot POST data to ${supabaseUrl}, failed with ${response.status}`)
    }
}

export async function get<T>(paramString: string): Promise<T> {
    const url = `${supabaseUrl}?${paramString}`;
    const response = await fetch(url, {
        headers: {'apiKey': apiKey}
    })

    if (!response.ok) {
        throw new Error(`Cannot GET data from ${url}, failed with ${response.status}`)
    }

    return response.json()
}
