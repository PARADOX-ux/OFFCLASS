'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Future: Connect to backend/API
    setSubmitted(true);
  };

  return (
    <>
      <section className="py-24 md:py-32 bg-[var(--color-offwhite)]">
        <div className="container mx-auto max-w-[1320px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Info */}
            <div>
              <p className="section-label">Contact</p>
              <h1 className="text-display-lg mb-6">
                Get in touch.
              </h1>
              <p className="text-body-lg text-[var(--color-muted)] mb-8 max-w-[440px]">
                Have feedback, a suggestion, a partnership inquiry, or want to report a problem?
                We&apos;d like to hear from you.
              </p>

              <div className="space-y-4 text-[0.9rem] text-[var(--color-muted)]">
                <div>
                  <h3 className="font-semibold text-[var(--color-ink)] font-[var(--font-display)] mb-1">
                    General inquiries
                  </h3>
                  <p>hello@offclass.in <span className="text-[0.75rem]">(placeholder)</span></p>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-ink)] font-[var(--font-display)] mb-1">
                    Partnerships
                  </h3>
                  <p>partners@offclass.in <span className="text-[0.75rem]">(placeholder)</span></p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              {submitted ? (
                <div className="card p-8 text-center">
                  <CheckCircle2 size={48} className="text-[#16a34a] mx-auto mb-4" />
                  <h3 className="text-[1.3rem] font-bold font-[var(--font-display)] mb-2">
                    Message received!
                  </h3>
                  <p className="text-[0.9rem] text-[var(--color-muted)]">
                    Thanks for reaching out. This is a demo form — in the live version, your message would be processed.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', category: '', message: '' }); }}
                    className="btn btn-outline btn-sm mt-6"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="card p-8">
                  <div className="space-y-5">
                    <div>
                      <label className="label" htmlFor="contact-name">Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        className="input"
                        required
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="label" htmlFor="contact-email">Email</label>
                      <input
                        id="contact-email"
                        type="email"
                        className="input"
                        required
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="label" htmlFor="contact-category">Reason</label>
                      <select
                        id="contact-category"
                        className="select"
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        <option value="">Select a reason...</option>
                        <option value="feedback">General Feedback</option>
                        <option value="suggestion">Feature Suggestion</option>
                        <option value="partnership">Partnership Inquiry</option>
                        <option value="report">Report a Problem</option>
                        <option value="opportunity">Submit an Opportunity</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="label" htmlFor="contact-message">Message</label>
                      <textarea
                        id="contact-message"
                        className="input"
                        required
                        placeholder="Tell us what's on your mind..."
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary w-full">
                      Send Message
                      <Send size={16} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
