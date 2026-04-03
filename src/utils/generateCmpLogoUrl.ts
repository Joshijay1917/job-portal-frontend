export function generateCmpLogoUrl(logo_url: string) {
    const token = import.meta.env.VITE_LOGO_API_TOKEN
    const formattedUrl = logo_url.replace(/^https?:\/\//, '');
    return `https://img.logo.dev/${formattedUrl}?token=${token}`;
}