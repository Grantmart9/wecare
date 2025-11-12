// Color configuration types
export interface Colors {
  orange: string;
  red: string;
  green: string;
  blue: string;
  pink: string;
  yellow: string;
}

export const API_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
export const NEXT_PUBLIC_GOOGLE_API_KEY = "AIzaSyDFqp0PGp-vOy_BLx-ljnGZcUks9VbJgXM"

/// Color palette ////
export const Colors: Colors = {
  orange: "rgba(251, 191, 36,0.72)",
  red: "rgba(248, 130, 130,0.72)",
  green: "rgba(167, 243, 208,0.72)",
  blue: "rgba(135, 206, 250,0.72)",
  pink: "rgba(249, 168, 212,0.72)",
  yellow: "rgba(250, 223, 135,0.72)",
}