"use client";

import { useState, type FormEvent } from "react";
import { MessageSquarePlus, Star } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import { Field, Textarea } from "@/components/ui/Field";
import Rating from "@/components/ui/Rating";
import { notify } from "@/components/ui/Toaster";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { Review } from "@/lib/types";

/**
 * Reviews with a "Write a review" form. New reviews are held for
 * moderation (admin panel), so they're acknowledged but not shown.
 */
export default function ReviewList({ reviews, subject }: { reviews: Review[]; subject: string }) {
  const [writing, setWriting] = useState(false);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [error, setError] = useState<string>();

  function submit(event: FormEvent) {
    event.preventDefault();
    if (text.trim().length < 20) {
      setError("Please write at least 20 characters.");
      return;
    }
    setWriting(false);
    setText("");
    setError(undefined);
    notify("Thanks! Your review will appear once it's approved.");
  }

  return (
    <section aria-labelledby="reviews-heading">
      <div className="flex items-center justify-between gap-3">
        <h3 id="reviews-heading">Reviews</h3>
        <Button variant="ghost" size="sm" onClick={() => setWriting((open) => !open)} aria-expanded={writing}>
          <MessageSquarePlus aria-hidden /> Write a review
        </Button>
      </div>

      {writing ? (
        <form onSubmit={submit} className="panel mt-4 flex flex-col gap-4">
          <fieldset>
            <legend className="field-label mb-2">Your rating for {subject}</legend>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  aria-label={`${value} stars`}
                  aria-pressed={rating === value}
                >
                  <Star
                    className={cn("h-6 w-6 text-sun-500", value <= rating ? "fill-current" : "fill-transparent")}
                    aria-hidden
                  />
                </button>
              ))}
            </div>
          </fieldset>
          <Field label="Your review" error={error}>
            {(props) => (
              <Textarea
                {...props}
                rows={4}
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="What should other travellers know?"
              />
            )}
          </Field>
          <Button type="submit" className="self-start">
            Submit review
          </Button>
        </form>
      ) : null}

      <div className="mt-4 flex flex-col gap-3">
        {reviews.length === 0 ? (
          <EmptyState
            icon={MessageSquarePlus}
            title="No reviews yet"
            description="Be the first to share your experience."
          />
        ) : (
          reviews.map((review) => (
            <article key={review.author + review.date} className="row-item items-start">
              <Avatar name={review.author} />
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong>
                    {review.author}
                    {review.country ? <span className="font-normal text-ink-400"> · {review.country}</span> : null}
                  </strong>
                  <Rating value={review.rating} hideValue />
                </div>
                <p className="mt-1 text-sm text-ink-600">{review.text}</p>
                <time className="mt-1 block text-xs text-ink-400" dateTime={review.date}>
                  {formatDate(review.date)}
                </time>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
