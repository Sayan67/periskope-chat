type ChatItemProps = {
  chat: {
    id: string;
    name: string;
    lastMessage: string;
    time: string;
  };
  style: React.CSSProperties;
};

export function ChatItem({ chat, style }: ChatItemProps) {
  return (
    <div style={style} className="flex items-center px-4 py-3 border-b">
      <div className="w-12 h-12 bg-gray-300 rounded-full mr-4" />
      <div className="flex-1">
        <div className="font-medium">{chat.name}</div>
        <div className="text-sm text-gray-500 truncate">{chat.lastMessage}</div>
      </div>
      <div className="text-xs text-gray-400">{chat.time}</div>
    </div>
  );
}
