import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();
        const response = await axios.post('http://193.57.139.76:8000/generate', { prompt }, {
            timeout: 20000
        });
        return NextResponse.json(
            { response: response.data },
            {
                status: 200,
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                    'Surrogate-Control': 'no-store',
                },
            }
        );
    } catch (error) {
        console.error('Error fetching synth info:', error);
        return NextResponse.json({ error: 'Failed to fetch synth info' }, { status: 500 });
    }
}
