import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const SUPPORTED_TYPES = ['status', 'by-gov-entity', 'by-time'];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const type = searchParams.get('type');

  if (!type || (type && !SUPPORTED_TYPES.includes(type))) {
    return NextResponse.json(
      { message: 'Missing type parametar' },
      { status: 400 },
    );
  }

  searchParams.delete('type');

  try {
    const url = `${process.env.BACKEND_BASE_URL}/api/reports/${type}/export?${searchParams.toString()}`;
    const token = (await cookies()).get('access_token')?.value;

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: 'Failed to fecth PDF' },
        { status: response.status },
      );
    }

    const pdfBuffer = await response.arrayBuffer();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="report.pdf"',
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return NextResponse.json(
      { message: 'Failed to fecth PDF' },
      { status: 400 },
    );
  }
}
