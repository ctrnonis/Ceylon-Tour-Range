"use client";

import { useState } from "react";
import { BedDouble, CalendarDays, Download, Flag, MapPinned, Inbox } from "lucide-react";
import { useActiveTab } from "@/components/app-shell/AppShell";
import SectionHeader from "@/components/app-shell/SectionHeader";
import BookingsTable from "@/components/bookings/BookingsTable";
import { submissionStatusBadge } from "@/components/bookings/submission-status";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import { Checkbox, Field, Input, Select } from "@/components/ui/Field";
import Money from "@/components/ui/Money";
import Panel from "@/components/ui/Panel";
import Stat from "@/components/ui/Stat";
import Tabs from "@/components/ui/Tabs";
import { notify } from "@/components/ui/Toaster";
import { getGuide } from "@/lib/data/guides";
import { adminKpis, platformUsers, reportedReviews, supportTickets, type SupportTicket } from "@/lib/data/platform";
import { formatDate, formatNumber } from "@/lib/format";
import { useBookings } from "@/lib/store/booking-store";
import { setSubmissionStatus, useSubmissions } from "@/lib/store/submission-store";
import type { PlatformUser, Submission } from "@/lib/types";
import BookingsChart from "./BookingsChart";

export const ADMIN_TABS = ["analytics", "users", "bookings", "moderation", "support", "settings"] as const;

const kindIcon: Record<Submission["kind"], typeof MapPinned> = {
  place: MapPinned,
  hotel: BedDouble,
  event: CalendarDays,
};

/** Admin dashboard: analytics, users, bookings, moderation, support and settings. */
export default function AdminView() {
  const tab = useActiveTab(ADMIN_TABS);
  return (
    <>
      {tab === "analytics" && <Analytics />}
      {tab === "users" && <Users />}
      {tab === "bookings" && <AllBookings />}
      {tab === "moderation" && <Moderation />}
      {tab === "support" && <Support />}
      {tab === "settings" && <Settings />}
    </>
  );
}

function Analytics() {
  return (
    <>
      <SectionHeader
        title="Platform analytics"
        description="Last 30 days · sample figures until reporting is connected"
        actions={
          <>
            <Select className="input-sm !w-auto" aria-label="Period" defaultValue="30">
              <option value="30">Last 30 days</option>
              <option value="90">Quarter</option>
            </Select>
            <Button variant="ghost" size="sm" onClick={() => notify("Exports arrive with the reporting backend")}>
              <Download aria-hidden /> Export
            </Button>
          </>
        }
      />
      <div className="mb-7 grid grid-cols-2 gap-4 xl:grid-cols-4">
        <Stat
          label="Revenue"
          value={<Money usd={adminKpis.revenueUsd} />}
          note={`▲ ${adminKpis.revenueTrend}`}
          trend="up"
        />
        <Stat
          label="Bookings"
          value={formatNumber(adminKpis.bookings)}
          note={`▲ ${adminKpis.bookingsTrend}`}
          trend="up"
        />
        <Stat
          label="Active users"
          value={formatNumber(adminKpis.activeUsers)}
          note={`▲ ${adminKpis.usersTrend}`}
          trend="up"
        />
        <Stat
          label="Open tickets"
          value={supportTickets.filter((t) => t.status !== "resolved").length}
          note="5 resolved today"
        />
      </div>
      <Panel className="mb-6">
        <BookingsChart />
      </Panel>
      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Panel>
          <ModerationQueue limit={3} />
        </Panel>
        <Panel>
          <h3 className="mb-4">Newest users</h3>
          <ul className="flex flex-col gap-3">
            {platformUsers.slice(0, 4).map((user) => (
              <li key={user.id} className="row-item !p-3">
                <Avatar name={user.name} size={36} />
                <span className="flex-1">
                  <strong className="block text-sm">{user.name}</strong>
                  <span className="text-sm text-ink-400 capitalize">
                    {user.role} · {user.country}
                  </span>
                </span>
                <UserStatus status={user.status} />
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}

function UserStatus({ status }: { status: PlatformUser["status"] }) {
  const tone = status === "active" ? "teal" : status === "pending" ? "amber" : "red";
  return (
    <Badge tone={tone} className="capitalize">
      {status}
    </Badge>
  );
}

function Users() {
  const [users, setUsers] = useState(platformUsers);
  const [role, setRole] = useState<PlatformUser["role"] | "all">("all");
  const [query, setQuery] = useState("");
  const shown = users.filter(
    (u) => (role === "all" || u.role === role) && u.name.toLowerCase().includes(query.toLowerCase()),
  );

  function setStatus(id: string, status: PlatformUser["status"]) {
    setUsers((list) => list.map((u) => (u.id === id ? { ...u, status } : u)));
    notify(`User ${status === "suspended" ? "suspended" : "activated"}`);
  }

  return (
    <>
      <SectionHeader title="Users" description={`${users.length} accounts`} />
      <div className="mb-5 flex flex-wrap gap-3">
        <Input
          className="input-sm !w-64"
          type="search"
          placeholder="Search by name"
          aria-label="Search users"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Select
          className="input-sm !w-auto"
          aria-label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value as typeof role)}
        >
          <option value="all">All roles</option>
          <option value="traveller">Travellers</option>
          <option value="guide">Guides</option>
          <option value="driver">Drivers</option>
        </Select>
      </div>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Country</th>
              <th>Joined</th>
              <th>Status</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {shown.map((user) => (
              <tr key={user.id}>
                <td>
                  <span className="flex items-center gap-3">
                    <Avatar name={user.name} size={32} />
                    <strong>{user.name}</strong>
                  </span>
                </td>
                <td className="capitalize">{user.role}</td>
                <td>{user.country}</td>
                <td>{formatDate(user.joined)}</td>
                <td>
                  <UserStatus status={user.status} />
                </td>
                <td className="text-right">
                  {user.status === "suspended" ? (
                    <Button size="sm" variant="ghost" onClick={() => setStatus(user.id, "active")}>
                      Reactivate
                    </Button>
                  ) : user.status === "pending" ? (
                    <Button size="sm" onClick={() => setStatus(user.id, "active")}>
                      Verify
                    </Button>
                  ) : (
                    <Button size="sm" variant="ghost" onClick={() => setStatus(user.id, "suspended")}>
                      Suspend
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function AllBookings() {
  const bookings = useBookings();
  return (
    <>
      <SectionHeader title="Bookings" description="All hotel and taxi bookings on the platform (sample)." />
      <BookingsTable bookings={bookings} />
    </>
  );
}

function ModerationQueue({ limit }: { limit?: number }) {
  const pending = useSubmissions().filter((s) => s.status === "in-review");
  const [reports, setReports] = useState(reportedReviews);
  const shown = pending.slice(0, limit);

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h3>Moderation queue</h3>
        <Badge tone="amber">{pending.length + reports.length} pending</Badge>
      </div>
      {shown.length + reports.length === 0 ? <EmptyState icon={Inbox} title="All caught up" /> : null}
      <ul className="flex flex-col gap-3">
        {shown.map((item) => {
          const Icon = kindIcon[item.kind];
          return (
            <li key={item.id} className="row-item flex-wrap !p-3">
              <span className="icon-tile">
                <Icon aria-hidden />
              </span>
              <span className="min-w-40 flex-1">
                <strong className="block text-sm">{item.name}</strong>
                <span className="text-sm text-ink-400">
                  New {item.kind} · by {getGuide(item.submittedBy)?.name ?? "guide"} · {item.photos} photos
                </span>
              </span>
              <span className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    setSubmissionStatus(item.id, "live");
                    notify(`${item.name} approved`);
                  }}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setSubmissionStatus(item.id, "edits-requested", "Please add more photos and opening details.");
                    notify("Edits requested");
                  }}
                >
                  Request edits
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setSubmissionStatus(item.id, "rejected");
                    notify(`${item.name} rejected`);
                  }}
                >
                  Reject
                </Button>
              </span>
            </li>
          );
        })}
        {reports.map((report) => (
          <li key={report.id} className="row-item flex-wrap !p-3">
            <span className="icon-tile">
              <Flag aria-hidden />
            </span>
            <span className="min-w-40 flex-1">
              <strong className="block text-sm">Reported review on {report.target}</strong>
              <span className="text-sm text-ink-400">
                Flagged: {report.reason} · {report.reports} reports
              </span>
            </span>
            <span className="flex gap-2">
              <Button
                size="sm"
                onClick={() => {
                  setReports((r) => r.filter((x) => x.id !== report.id));
                  notify("Review kept");
                }}
              >
                Keep
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setReports((r) => r.filter((x) => x.id !== report.id));
                  notify("Review removed");
                }}
              >
                Remove
              </Button>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

function Moderation() {
  const all = useSubmissions();
  return (
    <>
      <SectionHeader
        title="Content moderation"
        description="Approve or reject places, hotels and events submitted by guides."
      />
      <Panel className="mb-6">
        <ModerationQueue />
      </Panel>
      <h3 className="mb-3">All submissions</h3>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Listing</th>
              <th>Type</th>
              <th>Guide</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {all.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.name}</strong>
                </td>
                <td className="capitalize">{item.kind}</td>
                <td>{getGuide(item.submittedBy)?.name}</td>
                <td>
                  <Badge tone={submissionStatusBadge[item.status].tone}>
                    {submissionStatusBadge[item.status].label}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

const ticketTone = { open: "amber", waiting: "teal", resolved: "green" } as const;

function Support() {
  const [tickets, setTickets] = useState(supportTickets);
  const [filter, setFilter] = useState<SupportTicket["status"] | "all">("all");
  const shown = tickets.filter((t) => filter === "all" || t.status === filter);

  return (
    <>
      <SectionHeader title="Support centre" description="Messages from travellers, guides and drivers." />
      <Tabs
        label="Ticket status"
        className="mb-5"
        value={filter}
        onChange={setFilter}
        options={[
          { value: "all", label: "All" },
          { value: "open", label: "Open" },
          { value: "waiting", label: "Waiting" },
          { value: "resolved", label: "Resolved" },
        ]}
      />
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Ticket</th>
              <th>From</th>
              <th>Priority</th>
              <th>Updated</th>
              <th>Status</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {shown.map((ticket) => (
              <tr key={ticket.id}>
                <td>
                  <strong>{ticket.subject}</strong>
                  <div className="text-xs text-ink-400">{ticket.id}</div>
                </td>
                <td>{ticket.from}</td>
                <td>
                  <Badge
                    tone={ticket.priority === "high" ? "red" : ticket.priority === "normal" ? "teal" : "light"}
                    className="capitalize"
                  >
                    {ticket.priority}
                  </Badge>
                </td>
                <td>{ticket.updated}</td>
                <td>
                  <Badge tone={ticketTone[ticket.status]} className="capitalize">
                    {ticket.status}
                  </Badge>
                </td>
                <td className="text-right">
                  {ticket.status !== "resolved" ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setTickets((list) =>
                          list.map((t) => (t.id === ticket.id ? { ...t, status: "resolved", updated: "just now" } : t)),
                        );
                        notify(`${ticket.id} resolved`);
                      }}
                    >
                      Resolve
                    </Button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Settings() {
  return (
    <>
      <SectionHeader title="Settings" description="Platform-wide options. Saved to the backend once it exists." />
      <form
        className="panel flex max-w-2xl flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          notify("Settings saved (demo)");
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Platform commission (%)">
            {(p) => <Input {...p} type="number" min={0} max={50} defaultValue={10} />}
          </Field>
          <Field label="Hotel tax rate (%)">
            {(p) => <Input {...p} type="number" min={0} max={50} defaultValue={12} />}
          </Field>
          <Field label="Support email">
            {(p) => <Input {...p} type="email" defaultValue="hello@ceylontourrange.lk" />}
          </Field>
          <Field label="Default currency">
            {(p) => (
              <Select {...p} defaultValue="USD">
                <option>USD</option>
                <option>LKR</option>
                <option>EUR</option>
                <option>GBP</option>
              </Select>
            )}
          </Field>
        </div>
        <Checkbox label="Require admin approval for new guide listings" defaultChecked />
        <Checkbox label="Allow cash payments for taxi rides" defaultChecked />
        <Checkbox label="Maintenance mode (show a notice to visitors)" />
        <Button type="submit" className="self-start">
          Save settings
        </Button>
      </form>
    </>
  );
}
