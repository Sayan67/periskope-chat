import React, { useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import { ChatItem } from "./ChatItem";
import {
  fetchChatById,
  fetchChatList,
  fetchParticipantsForChats,
} from "@/services/chat-list";
import { Chat } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useAtom } from "jotai";
import { chatListAtom, chatParticipantsAtom } from "@/store/chatList";
import { useAuth } from "@/components/Proveiders/AuthProvider";
import { listenForNewChats } from "@/services/listenToChatLIst";
import { filtersAtom } from "@/store/filters";

export const ChatList = ({ loading }: { loading: boolean }) => {
  const [allChatList, setAllChatList] = useAtom(chatListAtom);
  const [chatList, setChatList] = useState<Chat[] | undefined>([]);
  const supabase = createClient();
  
  const { user } = useAuth();
  const [filterState, setFilterState] = useAtom(filtersAtom);

  useEffect(() => {
    if (filterState.state === "search" && filterState.search.length > 0) {
      setChatList(
        allChatList?.filter((chat) =>
          chat.is_group
            ? chat?.name
                ?.toLowerCase()
                .includes(filterState.search.toLowerCase())
            : chat?.chat_participants
                .filter((i) => i.user.id !== user?.id)[0]
                ?.user.name?.toLowerCase()
                .includes(filterState.search.toLowerCase())
        )
      );
    } else if (
      (filterState.state === "search" && filterState.search.length === 0) ||
      filterState.state === ""
    ) {
      setChatList(allChatList);
    } else {
      setChatList([]);
    }
  }, [filterState.state, filterState.search, allChatList, user]);

  return (
    <React.Fragment>
      {!loading && chatList?.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-gray-500 text-sm">
            No Chats Found, please create new chat.
          </div>
        </div>
      ) : (
        <InfiniteLoader
          itemCount={chatList?.length ?? 0}
          isItemLoaded={(index) => index < (chatList?.length ?? 0)}
          loadMoreItems={async (startIndex, stopIndex) => {
            // You can make an API call here to fetch more items
            // getProductList();
          }}
        >
          {({ onItemsRendered, ref }) => (
            <AutoSizer>
              {({ height, width }) => (
                <List
                  ref={ref}
                  onItemsRendered={onItemsRendered}
                  height={height}
                  itemCount={chatList?.length ?? 0}
                  itemSize={85}
                  width={width}
                >
                  {({ index, style }) => {
                    return <ChatItem style={style} chat={chatList?.[index]} />;
                  }}
                </List>
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
      )}
      <div className="w-full h-full">
        {loading &&
          chatList?.length === 0 &&
          new Array(6).fill(0).map((_, i) => (
            <div className="w-full" key={i}>
              <SkeletonDemo key={i} />
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};

function SkeletonDemo() {
  return (
    <div className="flex items-start px-3 py-3 border-b cursor-pointer hover:bg-gray-100">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  );
}
