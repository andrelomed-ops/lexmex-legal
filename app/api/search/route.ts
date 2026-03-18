import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();
    
    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // Using DuckDuckGo HTML scraping for legal/mexican results
    const searchQuery = encodeURIComponent(`${query} México ley jurisprudencia`);
    const url = `https://html.duckduckgo.com/html/?q=${searchQuery}`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const html = await response.text();
    
    // Extract search results
    const results: Array<{title: string, url: string, snippet: string}> = [];
    const resultRegex = /<a class="result__a" href="([^"]+)"[^>]*>([^<]+)<\/a>[\s\S]*?<a class="result__snippet"[^>]*>([^<]+)<\/a>/g;
    
    let match;
    let count = 0;
    while ((match = resultRegex.exec(html)) !== null && count < 10) {
      results.push({
        title: match[2].replace(/<[^>]+>/g, '').trim(),
        url: match[1],
        snippet: match[3].replace(/<[^>]+>/g, '').trim()
      });
      count++;
    }

    return NextResponse.json({
      success: true,
      results: results.slice(0, 8),
      query: query
    });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Error performing search' },
      { status: 500 }
    );
  }
}
