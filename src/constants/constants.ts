export const DEFAULT_INVOICE_PARAMETERS = {
  search: "type:invoice",
  page: 1,
  limit: 10,
};

export const DEFAULT_BILL_PARAMETERS = {
  search: "type:bill",
  page: 1,
  limit: 10,
};

export const getTableHeaders = (documentType: string) => [
  { label: `${documentType === "invoice" ? "Invoice" : "Bill"} number` },
  { label: "Payee" },
  { label: "Phone number" },
  { label: "Amount" },
  { label: "Issued at" },
  { label: "Due at" },
  { label: "Status" },
  { label: "Details" },
];
