"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { notify } from "@/components/ui/Toaster";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const topics = ["Booking support", "Guide application", "Partnerships", "Press", "Something else"];

type Errors = Partial<Record<"name" | "email" | "message", string>>;

/** Contact form. Messages will be emailed / ticketed by the backend; for now they're validated and acknowledged. */
export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(topics[0]!);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  function submit(event: FormEvent) {
    event.preventDefault();
    const next: Errors = {};
    if (!name.trim()) next.name = "Enter your name.";
    if (!EMAIL_PATTERN.test(email)) next.email = "Enter a valid email address.";
    if (message.trim().length < 10) next.message = "Tell us a little more (10+ characters).";
    setErrors(next);
    if (Object.keys(next).length) return;

    notify("Thanks! We'll reply within one business day.");
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <form onSubmit={submit} noValidate className="panel flex flex-col gap-4">
      <h3>Send a message</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name}>
          {(p) => <Input {...p} autoComplete="name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />}
        </Field>
        <Field label="Email" error={errors.email}>
          {(p) => <Input {...p} type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />}
        </Field>
      </div>
      <Field label="Topic">
        {(p) => (
          <Select {...p} value={topic} onChange={(e) => setTopic(e.target.value)}>
            {topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
        )}
      </Field>
      <Field label="Message" error={errors.message}>
        {(p) => <Textarea {...p} rows={5} placeholder="How can we help?" value={message} onChange={(e) => setMessage(e.target.value)} />}
      </Field>
      <Button type="submit" block>
        <Send aria-hidden /> Send message
      </Button>
    </form>
  );
}
