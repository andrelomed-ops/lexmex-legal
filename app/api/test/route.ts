import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    success: true, 
    message: 'API funciona correctamente',
    timestamp: new Date().toISOString()
  });
}
