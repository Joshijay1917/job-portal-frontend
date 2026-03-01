export function generateCmpLogoUrl(logo_url: string) {
    const token = import.meta.env.VITE_LOGO_API_TOKEN
    return `https://img.logo.dev/${logo_url}?token=${token}`
}