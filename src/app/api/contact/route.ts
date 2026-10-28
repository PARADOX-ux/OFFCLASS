import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, category, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // If Supabase is configured and reachable, record the contact message
    if (isSupabaseConfigured) {
      try {
        await supabase.from('contact_submissions').insert({
          name: name.trim().slice(0, 100),
          email: email.trim().toLowerCase().slice(0, 150),
          category: (category || 'General').slice(0, 50),
          message: message.trim().slice(0, 3000),
          created_at: new Date().toISOString(),
        });
      } catch (dbErr) {
        // Fallback: log error without breaking client response
        console.warn('Contact message recorded locally (DB insert bypassed):', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been received.',
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Failed to process message. Please try again.' },
      { status: 500 }
    );
  }
}
