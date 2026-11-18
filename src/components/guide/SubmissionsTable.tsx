import Badge from "@/components/ui/Badge";
import Rating from "@/components/ui/Rating";
import { submissionStatusBadge } from "@/components/bookings/submission-status";
import { formatNumber } from "@/lib/format";
import type { Submission } from "@/lib/types";

export default function SubmissionsTable({ items }: { items: Submission[] }) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>Listing</th>
            <th>Category</th>
            <th>Visits</th>
            <th>Rating</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const status = submissionStatusBadge[item.status];
            return (
              <tr key={item.id}>
                <td>
                  <strong>{item.name}</strong>
                  {item.note ? (
                    <div className="max-w-xs text-xs text-danger">{item.note}</div>
                  ) : (
                    <div className="text-xs text-ink-400">{item.district}</div>
                  )}
                </td>
                <td>{item.category}</td>
                <td>{item.visits === null ? "–" : formatNumber(item.visits)}</td>
                <td>{item.rating === null ? "–" : <Rating value={item.rating} compact />}</td>
                <td>
                  <Badge tone={status.tone}>{status.label}</Badge>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
