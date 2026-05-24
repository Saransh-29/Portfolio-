'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/* ─── Social links — update hrefs ───────────────────────── */
const SOCIALS = [
  {
    label: 'GitHub',
    href:  'https://github.com/YOUR_USERNAME',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    color: '#ffffff',
  },
  {
    label: 'LinkedIn',
    href:  'https://linkedin.com/in/YOUR_USERNAME',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: '#0077b5',
  },
  {
    label: 'Email',
    href:  'mailto:saransh2905@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    color: '#00d4ff',
  },
] as const;

/* ─── Form field component ──────────────────────────────── */
interface FieldProps {
  label:       string;
  id:          string;
  type?:       string;
  placeholder: string;
  value:       string;
  onChange:    (v: string) => void;
  error?:      string;
  multiline?:  boolean;
}

function Field({ label, id, type = 'text', placeholder, value, onChange, error, multiline }: FieldProps) {
  const [focused, setFocused] = useState(false);
  const baseClass = `w-full bg-transparent font-mono text-sm text-white/90
    placeholder:text-text-muted outline-none resize-none
    border-b transition-all duration-300 py-3
    ${focused || value
      ? 'border-accent-cyan/60'
      : error
        ? 'border-red-500/50'
        : 'border-white/8 hover:border-white/15'
    }`;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className={`font-mono text-[0.6rem] tracking-[0.2em] uppercase transition-colors duration-300
          ${focused ? 'text-accent-cyan' : 'text-text-muted'}`}
      >
        {label}
      </label>

      {multiline ? (
        <textarea
          id={id}
          rows={4}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={baseClass}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={baseClass}
        />
      )}

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="font-mono text-[0.58rem] tracking-wide text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Form state types ──────────────────────────────────── */
interface FormData {
  name:    string;
  email:   string;
  subject: string;
  message: string;
}
interface FormErrors { [k: string]: string }
type Status = 'idle' | 'sending' | 'sent' | 'error';

/* ─── Main section ──────────────────────────────────────── */
export default function Contact() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [form, setForm] = useState<FormData>({
    name: '', email: '', subject: '', message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>('idle');

  /* Validation */
  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim())                         e.name    = 'Name is required';
    if (!form.email.trim())                        e.email   = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                                                   e.email   = 'Enter a valid email';
    if (!form.subject.trim())                      e.subject = 'Subject is required';
    if (form.message.trim().length < 20)           e.message = 'Message must be at least 20 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* Submit — wires to mailto for now; swap for API route in production */
  const handleSubmit = async () => {
    if (!validate()) return;
    setStatus('sending');

    // Simulate network delay — replace with your API call
    await new Promise(r => setTimeout(r, 1600));

    // Build mailto fallback
    const mailto = `mailto:saransh2905@gmail.com`
      + `?subject=${encodeURIComponent(form.subject)}`
      + `&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.open(mailto, '_blank');

    setStatus('sent');
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus('idle'), 5000);
  };

  const setField = (field: keyof FormData) => (value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }));
  };

  const fadeUp = (i = 0) => ({
    hidden:  { opacity: 0, y: 24 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
    },
  });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-28 md:py-40 section-padding overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-4 mb-5"
        >
          <span className="section-label">07 — Contact</span>
          <div className="h-px flex-1 max-w-[100px] bg-accent-cyan/30" />
        </motion.div>

        <motion.h2
          variants={fadeUp(1)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="section-heading text-white/90 mb-3"
        >
          Let&apos;s build
          <span className="block gradient-text">something together</span>
        </motion.h2>

        <motion.p
          variants={fadeUp(2)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-text-secondary text-sm mb-16 max-w-md"
        >
          Open to internships, collaborations, and interesting projects.
          Drop a message and I&apos;ll get back to you promptly.
        </motion.p>

        {/* ── Two-column layout ─────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">

          {/* LEFT — info + socials */}
          <motion.div
            variants={fadeUp(3)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex flex-col gap-8"
          >
            {/* Availability card */}
            <div className="glass-card rounded-2xl p-6 border border-border-subtle">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"
                  style={{ boxShadow: '0 0 8px rgba(52,211,153,0.8)' }}
                />
                <span className="font-mono text-[0.65rem] tracking-widest uppercase text-emerald-400">
                  Available
                </span>
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-1">
                Open to internship opportunities
              </p>
              <p className="text-text-muted text-xs">
                B.Tech CS @ UPES · Graduating 2027
              </p>
            </div>

            {/* Contact details */}
            <div className="flex flex-col gap-4">
              <a
                href="mailto:saransh2905@gmail.com"
                className="flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-xl glass-card border border-border-subtle
                                flex items-center justify-center text-text-muted
                                group-hover:border-border-glow group-hover:text-accent-cyan
                                transition-all duration-300 shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="font-mono text-[0.58rem] tracking-widest uppercase text-text-muted">Email</p>
                  <p className="text-sm text-white/70 group-hover:text-white transition-colors duration-300">
                    saransh2905@gmail.com
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl glass-card border border-border-subtle
                                flex items-center justify-center text-text-muted shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-mono text-[0.58rem] tracking-widest uppercase text-text-muted">Location</p>
                  <p className="text-sm text-white/70">Lucknow, India</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div>
              <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-text-muted mb-4">
                Find me on
              </p>
              <div className="flex gap-3">
                {SOCIALS.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-10 h-10 glass-card border border-border-subtle rounded-xl
                               flex items-center justify-center text-text-muted
                               transition-all duration-300 hover:-translate-y-1"
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = `${s.color}40`;
                      (e.currentTarget as HTMLElement).style.color = s.color;
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${s.color}18`;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = '';
                      (e.currentTarget as HTMLElement).style.color = '';
                      (e.currentTarget as HTMLElement).style.boxShadow = '';
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — contact form */}
          <motion.div
            variants={fadeUp(4)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="glass-card rounded-3xl p-8 border border-border-subtle"
          >
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                /* Success state */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-12 gap-4"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                    style={{ background: 'rgba(52,211,153,0.15)' }}
                  >
                    ✓
                  </div>
                  <h3 className="font-display text-xl font-bold text-white/90">Message sent!</h3>
                  <p className="text-text-secondary text-sm max-w-xs">
                    Thanks for reaching out. Your email client should have opened — I&apos;ll reply soon.
                  </p>
                </motion.div>
              ) : (
                /* Form */
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-7"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                    <Field
                      id="name" label="Name" placeholder="Saransh Singh"
                      value={form.name} onChange={setField('name')} error={errors.name}
                    />
                    <Field
                      id="email" label="Email" type="email" placeholder="you@example.com"
                      value={form.email} onChange={setField('email')} error={errors.email}
                    />
                  </div>
                  <Field
                    id="subject" label="Subject" placeholder="Internship opportunity / Collab idea"
                    value={form.subject} onChange={setField('subject')} error={errors.subject}
                  />
                  <Field
                    id="message" label="Message" placeholder="Hey Saransh, I came across your portfolio and..."
                    value={form.message} onChange={setField('message')} error={errors.message}
                    multiline
                  />

                  <button
                    onClick={handleSubmit}
                    disabled={status === 'sending'}
                    className="w-full font-mono text-[0.7rem] tracking-[0.16em] uppercase font-bold
                               py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3
                               disabled:opacity-60 disabled:cursor-not-allowed
                               bg-accent-cyan text-black hover:shadow-glow-cyan hover:scale-[1.01]"
                  >
                    {status === 'sending' ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10"
                            stroke="currentColor" strokeWidth="3" />
                          <path className="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                            d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}