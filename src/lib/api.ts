const useProxy = process.env.NEXT_PUBLIC_USE_PROXY === 'true';
export const API_URL = useProxy ? '/api' : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000');