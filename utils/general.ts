export function formatMessageDate(dateString: string): string {
  const messageDate = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - messageDate.getTime();

  // Convert to seconds, minutes, hours, days
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  // Today
  if (diffDays === 0) {
    // Within last hour
    if (diffHours === 0) {
      // Within last minute
      if (diffMinutes === 0) {
        return "Just now";
      }
      return `${diffMinutes}m ago`;
    }
    return `${diffHours}h ago`;
  }

  // Yesterday
  if (diffDays === 1) {
    return "Yesterday";
  }

  // Within last week
  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }

  // More than a week ago - show date
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };

  // Add year if not current year
  if (messageDate.getFullYear() !== now.getFullYear()) {
    options.year = "numeric";
  }

  return messageDate.toLocaleDateString("en-US", options);
}
