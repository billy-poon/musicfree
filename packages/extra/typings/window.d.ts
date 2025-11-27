interface Window {
    [K: `\$${string}`]: unknown
    [K: `@shared/${string}`]: unknown
    path: {
        extname(filename: string): string
    }
}
