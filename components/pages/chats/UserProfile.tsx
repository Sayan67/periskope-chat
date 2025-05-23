"use client";

import { useAuth } from "@/components/Proveiders/AuthProvider";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function UserProfile() {
  const { user, signOut } = useAuth();
  const [name, setName] = useState(user?.user_metadata?.name || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const supabase = createClient();

  const updateProfile = async () => {
    if (!user) return;

    setIsUpdating(true);
    setUpdateSuccess(false);

    const { error } = await supabase.auth.updateUser({
      data: { name },
    });

    setIsUpdating(false);

    if (!error) {
      setUpdateSuccess(true);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Your Profile</h2>

      <div className="mb-4">
        <p className="text-sm text-gray-500">Phone</p>
        <p>{user?.phone}</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-500 mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="flex space-x-4">
        <button
          onClick={updateProfile}
          disabled={isUpdating}
          className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
        >
          {isUpdating ? "Updating..." : "Update Profile"}
        </button>

        <button
          onClick={signOut}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
        >
          Sign Out
        </button>
      </div>

      {updateSuccess && (
        <p className="mt-4 text-green-700">Profile updated successfully!</p>
      )}
    </div>
  );
}
