export enum LeadStatus {
  // Not Started
  NewLead = 'New Lead',
  // Active
  AttemptToEngage = 'Attempt to Engage',
  Engaged = 'Engaged',
  // Done
  Unqualified = 'Unqualified - Follow', // followup, archive
  // Completed
  Qualified = 'Qualified',
}

// 'Contacted'  | 'Proposal Sent' | 'Negotiation' | 'Won' | 'Lost