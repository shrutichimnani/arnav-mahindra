/* ============================================================
   Supabase lead storage — inserts alongside Google Sheets.

   Every form submitHandler already calls submitToSheet() which
   sends data to Google Apps Script. This module adds a parallel
   Supabase insert into the matching table, called from inside
   submitToSheet() so ALL forms (Contact Us, Test Drive, Service,
   Phone Verification) get both destinations automatically.

   If the Supabase browser client is not configured (env vars
   missing) or the insert fails for any reason, the error is
   logged to console and the form submission still returns
   success — Google Sheets is the source of truth.
   ============================================================ */

import { supabaseBrowser } from "./supabase-browser";

const TABLE_MAP: Record<string, string> = {
  contactUs: "contact_us_leads",
  testDrive: "test_drive_leads",
  service: "service_leads",
  phoneVerification: "phone_verifications",
};

// Only the columns that actually exist in each Supabase table are sent.
// Keys: Google Sheets payload field name. Values: Supabase column name
// (when different — same name if absent). Add/remove entries here to
// match your table schemas.
const UTM_COLUMNS: Record<string, string> = {
  utm_source: "utm_source",
  utm_medium: "utm_medium",
  utm_campaign: "utm_campaign",
  utm_term: "utm_term",
  utm_content: "utm_content",
  utm_id: "utm_id",
};

const TABLE_COLUMNS: Record<string, Record<string, string>> = {
  contactUs: {
    ...UTM_COLUMNS,
    name: "name",
    phone: "mobile_number",
    email: "email",
    pincode: "pincode",
    subject: "subject",
    message: "message",
  },
  testDrive: {
    ...UTM_COLUMNS,
    carmodel: "car_model",
    location: "location",
    preferreddate: "preferred_date",
    preferredtime: "preferred_time",
    name: "name",
    phone: "mobile_number",
    email: "email",
    pincode: "pincode",
  },
  service: {
    ...UTM_COLUMNS,
    carmodel: "car_model",
    servicecentre: "service_centre",
    servicetype: "service_type",
    name: "name",
    phone: "mobile_number",
    email: "email",
    registrationnumber: "registration_number",
    preferreddate: "preferred_date",
    preferredtime: "preferred_time",
    pickupdrop: "pickup_drop",
  },
  phoneVerification: {
    ...UTM_COLUMNS,
    phonenumber: "phone_number",
    formsource: "form_source",
  },
};

let _available: boolean | null = null;

function isAvailable(): boolean {
  if (_available !== null) return _available;
  try {
    supabaseBrowser;
    _available = true;
  } catch {
    _available = false;
  }
  return _available;
}

export async function insertLeadToDb(
  formType: string,
  payload: Record<string, string>,
): Promise<void> {
  if (!isAvailable()) return;

  const table = TABLE_MAP[formType];
  if (!table) {
    console.warn(`[leads] Unknown formType "${formType}" — skipping Supabase insert.`);
    return;
  }

  const mapping = TABLE_COLUMNS[formType];
  const row: Record<string, string> = {};
  for (const [key, value] of Object.entries(payload)) {
    const col = mapping[key];
    if (col) {
      row[col] = value;
    }
  }

  try {
    const { error } = await supabaseBrowser
      .from(table)
      .insert({ ...row, created_at: new Date().toISOString() });

    if (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error(`[leads] Supabase insert into "${table}" failed:`, error.message);
      }
    }
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error(`[leads] Supabase insert into "${table}" failed:`, err);
    }
  }
}
