export function getYoutubeId(url) {

    if (!url) return null

    try {
        const parsed = new URL(url)
        const host = parsed.hostname.replace('www.', '')
        
        if (host === 'youtu.be') {
            return parsed.pathname.slice(1) || null
        }

        if (host === 'youtube.com' || host === 'm.youtube.com') {
            if (parsed.pathname === '/watch') {
                return parsed.searchParams.get('v')   // extra params (list, si, t, etc.) automatically ignore ho jate hain
            }
            if (parsed.pathname.startsWith('/embed/')) {
                return parsed.pathname.split('/embed/')[1]
            }
            if (parsed.pathname.startsWith('/shorts/')) {
                return parsed.pathname.split('/shorts/')[1]
            }
        }

        return null
    } catch {
        return null 
    }
}

export function getYoutubeThumbnail(url) {
    const id = getYoutubeId(url)
    
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null
}