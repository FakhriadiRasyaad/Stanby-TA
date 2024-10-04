// middleware.ts
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getUser } from '../frontend/src/components/SupabaseClient'; // Ganti dengan fungsi untuk mendapatkan user dari Supabase

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Cek apakah user terautentikasi
  const user = await getUser(); // Dapatkan user dari Supabase atau cookies


  const protectedRoutes = ['/home', '/monitor', '/dokumen', '/user'];

  if (!user && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', req.url)); // Redirect ke halaman login
  }

  return NextResponse.next(); // Lanjutkan ke halaman yang diminta
}
