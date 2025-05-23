import React, { useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import { ChatItem } from "./ChatItem";

export const ChatList = () => {
  const [chatList, setChatList] = useState([]);
  const getProductList = async () => {
    const data = await fetch("https://dummyjson.com/products");
    const json = await data.json();
    setChatList(json.products);
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <React.Fragment>
      <InfiniteLoader
        itemCount={chatList.length}
        isItemLoaded={(index) => index < chatList.length}
        loadMoreItems={async (startIndex, stopIndex) => {
          // You can make an API call here to fetch more items
          getProductList();
        }}
      >
        {({ onItemsRendered, ref }) => (
          <AutoSizer>
            {({ height, width }) => (
              <List
                ref={ref}
                onItemsRendered={onItemsRendered}
                height={height}
                itemCount={chatList.length}
                itemSize={60}
                width={width}
              >
                {({ index, style }) => {
                  return <ChatItem style={style} chat={chatList[index]} />;
                }}
              </List>
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    </React.Fragment>
  );
};
