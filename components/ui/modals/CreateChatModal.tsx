"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { modalAtom } from "@/store/modal";
import { useAtom } from "jotai";
import { Label } from "@/components/ui/label";
import { Upload, ImageIcon } from "lucide-react";
import { User } from "@/types";
import { searchUsers } from "@/services/fetchUsers";
import toast from "react-hot-toast";
import { useDebounce } from "use-debounce";
import { create } from "domain";
import { createOrGetOneToOneChat } from "@/services/createChat";
import { fetchChatList, fetchParticipantsForChats } from "@/services/chat-list";
import { chatListAtom, chatParticipantsAtom } from "@/store/chatList";

export default function CreateChatModal() {
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [tab, setTab] = useState("one-to-one");
  const [modalState, setModalState] = useAtom(modalAtom);
  const [groupName, setGroupName] = useState("");
  const [groupAvatar, setGroupAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [debouncedSearch] = useDebounce(search, 700);
  const [isSearching, setIsSearching] = useState(false);
  const [participantsMap, setParticipantsMap] = useAtom(chatParticipantsAtom);
  const [chatList, setChatList] = useAtom(chatListAtom);

  useEffect(() => {
    if (debouncedSearch && debouncedSearch.length >= 2) {
      setIsSearching(true);
      searchUsers(debouncedSearch)
        .then((fetchedUsers) => {
          setUsers(fetchedUsers);
        })
        .catch((error) => {
          toast.error("Error fetching users. Please try again.");
          console.error("Error fetching users:", error);
        })
        .finally(() => {
          setIsSearching(false);
        });
    } else {
      setUsers([]);
    }
  }, [debouncedSearch]);

  const usersMock = [
    { id: "1", name: "Alice", email: "alice@example.com" },
    { id: "2", name: "Bob", email: "bob@example.com" },
    { id: "3", name: "Charlie", email: "charlie@example.com" },
  ];

  const handleUserSelect = (user: any) => {
    if (!selectedUsers.some((u) => u.id === user.id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleUserRemove = (userId: string) => {
    setSelectedUsers(selectedUsers.filter((u) => u.id !== userId));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setGroupAvatar(file);

      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChatCreation = async () => {
    if (tab === "group") {
      if (selectedUsers.length < 2 || !groupName.trim()) {
        toast.error("Please select at least 2 users and provide a group name.");
        return;
      }

      // Create group chat logic here
      // For now, we will just log the group details
      console.log("Creating group chat with:", {
        name: groupName,
        avatar: groupAvatar,
        members: selectedUsers,
      });

      toast.success("Group chat created successfully!");
    } else {
      if (selectedUsers.length !== 1) {
        toast.error("Please select exactly one user for 1:1 chat.");
        return;
      }

      // Create 1:1 chat logic here
      const res = await createOrGetOneToOneChat(selectedUsers[0].id);
      if (res.error) {
        toast.error(`Error creating chat: ${res.error}`);
        return;
      }
      const data = await fetchChatList();
      console.log(data);

      if (data.length > 0) {
        const chatIds = data.map((chat) => chat.id);
        const participants = await fetchParticipantsForChats(
          res.id ? [res.id] : chatIds
        );
        const newMap = { ...participantsMap, ...participants };
        setParticipantsMap(newMap);
      }
      setChatList(data);
      console.log("Creating 1:1 chat with:", selectedUsers[0]);
      toast.success("1:1 chat created successfully!");
    }
    // Reset state after creation
    setSelectedUsers([]);
    setGroupName("");
    setGroupAvatar(null);
    setAvatarPreview(null);
    setModalState("");
  };

  return (
    <Dialog
      open={modalState === "createChat"}
      onOpenChange={(open) => {
        if (!open) {
          setModalState("");
        }
      }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogTitle className="text-lg font-semibold mb-4">
          {tab === "group" ? "Create Group Chat" : "Start a Conversation"}
        </DialogTitle>
        <Tabs
          defaultValue="one-to-one"
          onValueChange={(value) => {
            setTab(value);
            setSelectedUsers([]);
            setGroupName("");
            setGroupAvatar(null);
            setAvatarPreview(null);
          }}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="one-to-one">1:1 Chat</TabsTrigger>
            <TabsTrigger value="group">Group Chat</TabsTrigger>
          </TabsList>

          <TabsContent value="one-to-one">
            <Input
              placeholder="Search by email or phone"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-4"
            />
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex justify-between items-center px-2 py-1 bg-muted rounded cursor-pointer hover:bg-muted/70"
                  onClick={() => handleUserSelect(user)}
                >
                  <span>{user.name}</span>
                  <span>{user.email}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUserSelect(user);
                    }}
                  >
                    Add
                  </Button>
                </div>
              ))}
            </div>
            {selectedUsers.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-2">Selected:</h4>
                {selectedUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between px-2 py-1 text-sm bg-secondary mb-1 rounded"
                  >
                    <span>{user.name}</span>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleUserRemove(user.id)}
                      className="text-red-500 bg-red-100 border border-red-200 hover:bg-red-200 hover:text-red-600"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="group">
            <div className="mb-4 space-y-2">
              <Label htmlFor="groupName">Group Name</Label>
              <Input
                id="groupName"
                placeholder="Enter group name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>

            <div className="mb-4 space-y-2">
              <Label htmlFor="groupAvatar">Group Avatar</Label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Group Avatar Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="text-gray-400 w-8 h-8" />
                  )}
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="avatar-upload"
                    className="cursor-pointer flex items-center gap-2 p-2 border rounded hover:bg-gray-50 transition-colors"
                  >
                    <Upload size={16} />
                    <span>Choose image</span>
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended: Square image, max 2MB
                  </p>
                </div>
              </div>
            </div>

            <Input
              placeholder="Search users to add to group"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-4"
            />
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex justify-between items-center px-2 py-1 bg-muted rounded cursor-pointer hover:bg-muted/70"
                >
                  <span>{user.name}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleUserSelect(user)}
                  >
                    Add
                  </Button>
                </div>
              ))}
            </div>
            {selectedUsers.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-2">
                  Selected Members ({selectedUsers.length}):
                </h4>
                {selectedUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between px-2 py-1 text-sm bg-secondary mb-1 rounded"
                  >
                    <span>{user.name}</span>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleUserRemove(user.id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <Button
          onClick={handleChatCreation}
          className="mt-4 w-full bg-green-700"
          disabled={
            tab === "group"
              ? selectedUsers.length < 2 || !groupName.trim()
              : selectedUsers.length !== 1
          }
        >
          {tab === "group" ? "Create Group" : "Create 1:1 Chat"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
