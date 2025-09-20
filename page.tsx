'use client';
import Link from 'next/link';
export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h2>RP Studios — Admin Home</h2>
      <div className="grid" style={{marginTop:16}}>
        <Link className="btn" href="/admin/promotions">Promotions</Link>
        <Link className="btn" href="/admin/store">Store Admin</Link>
        <Link className="btn" href="/admin/crm">CRM</Link>
        <Link className="btn" href="/admin/calendar">Calendar</Link>
        <Link className="btn" href="/admin/ai-timeline">AI Timeline</Link>
        <Link className="btn" href="/client/billing">Client Billing</Link>
      </div>
    </main>
  );
}
