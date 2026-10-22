'use client';

import { useState, type FormEvent } from 'react';
import { ArrowIcon } from './Icons';

type Field = 'name' | 'email' | 'message';
type Status = { kind: 'idle' | 'sending' | 'error' | 'success'; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function check(field: Field, value: string): string {
  const v = value.trim();
  if (field === 'name') return v ? '' : 'Please enter your name.';
  if (field === 'email') return !v ? 'Please enter your email.' : EMAIL_RE.test(v) ? '' : 'Please enter a valid email address.';
  return v.length >= 10 ? '' : 'Please write a message (at least 10 characters).';
}

export default function ContactForm({ enabled, email }: { enabled: boolean; email: string }) {
  const [errors, setErrors] = useState<Record<Field, string>>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>({ kind: 'idle', message: '' });

  const onBlur = (field: Field, value: string) => {
    if (errors[field]) setErrors((e) => ({ ...e, [field]: check(field, value) }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const values = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      message: String(data.get('message') ?? ''),
    };
    const next = {
      name: check('name', values.name),
      email: check('email', values.email),
      message: check('message', values.message),
    };
    setErrors(next);
    const firstBad = (Object.keys(next) as Field[]).find((k) => next[k]);
    if (firstBad) {
      form.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      setStatus({ kind: 'error', message: 'Please fix the highlighted fields.' });
      return;
    }

    if (!enabled) {
      setStatus({
        kind: 'error',
        message: 'Not sent — this form isn’t connected to an email service yet. Your message is still here.',
      });
      return;
    }

    setStatus({ kind: 'sending', message: 'Sending…' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, company: String(data.get('company') ?? '') }),
      });
      const body = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      if (!res.ok || !body?.ok) throw new Error(`Request failed (${res.status})`);
      form.reset();
      setStatus({ kind: 'success', message: 'Thanks — your message was sent. I’ll get back to you soon.' });
    } catch {
      setStatus({ kind: 'error', message: 'Sorry, your message could not be sent. Please try again in a moment.' });
    }
  }

  const fieldProps = (field: Field) => ({
    id: `f-${field}`,
    name: field,
    required: true,
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': `f-${field}-err`,
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => onBlur(field, e.target.value),
  });

  return (
    <form className="form" id="contact-form" noValidate onSubmit={onSubmit} aria-describedby={enabled ? undefined : 'form-setup'}>
      {!enabled && (
        <p className="form__setup" id="form-setup">
          <strong>Setup required:</strong> this form isn’t connected to an email service yet, so messages can’t be sent
          from here{email ? (
            <>
              {' '}
              — please email <a href={`mailto:${email}`}>{email}</a> instead
            </>
          ) : null}
          .
        </p>
      )}
      <div className="form__row">
        <div className="field">
          <label htmlFor="f-name">Name</label>
          <input type="text" autoComplete="name" maxLength={100} {...fieldProps('name')} />
          <p className="field__err" id="f-name-err">
            {errors.name}
          </p>
        </div>
        <div className="field">
          <label htmlFor="f-email">Email</label>
          <input type="email" autoComplete="email" maxLength={254} {...fieldProps('email')} />
          <p className="field__err" id="f-email-err">
            {errors.email}
          </p>
        </div>
      </div>
      <div className="field">
        <label htmlFor="f-message">Message</label>
        <textarea rows={5} maxLength={5000} {...fieldProps('message')} />
        <p className="field__err" id="f-message-err">
          {errors.message}
        </p>
      </div>
      {/* Spam trap: hidden from people, often filled in by bots */}
      <div className="field--trap" aria-hidden="true">
        <label htmlFor="f-company">Company</label>
        <input id="f-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form__foot">
        <button className="btn btn--black" type="submit" disabled={status.kind === 'sending'}>
          Send Message <ArrowIcon />
        </button>
        <p className="form__status" role="status" aria-live="polite" data-kind={status.kind}>
          {status.message}
        </p>
      </div>
    </form>
  );
}
