// app/api/debug-env/route.ts
export async function GET() {
    return Response.json({
      apiUrl: process.env.NEXT_PUBLIC_API_URL,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      environment: process.env.ENVIRONMENT ?? 'not set',
    })
  }