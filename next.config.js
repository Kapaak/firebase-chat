module.exports = {
  reactStrictMode: true,
  env:{
    API_KEY:process.env.NEXT_PUBLIC_API_KEY,
    AUTH_DOMAIN: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    DB_URL: process.env.NEXT_PUBLIC_DB_URL,
    PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
    STORAGE_BUCKET: process.env.NEXT_PUBLIC_STORRAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    APP_ID: process.env.NEXT_PUBLIC_APP_ID,
    MEASUREMENT_ID: process.env.NEXT_PUBLIC_MEASUREMENT_ID
  }
}
