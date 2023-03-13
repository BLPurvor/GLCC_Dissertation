export default function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(date));
}
