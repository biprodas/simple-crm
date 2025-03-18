export enum InvoiceStatus {
  Draft = 'Draft',
  // Active
  ReadyToSend = 'Ready to Send',
  Sent = 'Sent',
  Unpaid = 'Unpaid',
  // Done
  Canceled = 'Canceled',
  // Completed
  Paid = 'Paid',
}
