export default function formatAddress(
  province: string | null | undefined,
  city: string | null | undefined,
  barangay: string | null | undefined,
) {
  if (!province && !city && !barangay) return "N/A";
  return `${barangay || "n/a"}, ${city || "n/a"}, ${province || "n/a"}`;
}
