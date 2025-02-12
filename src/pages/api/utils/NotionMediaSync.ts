export async function syncNotionMedia(fileUrl: string, fileFolder: string) {
    const nsmUrl = process.env.NSM_URL;
    if (!nsmUrl) throw new Error('NSM_URL não está definida');
    
    const response = await fetch(nsmUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NSM_TOKEN}`
        },
        body: JSON.stringify({ fileUrl, fileFolder })
    });

    const data = await response.json();

    return data?.url;
}
