import React from "react";
import UserCard from "components/Profile/UserCard";
import ActivityFeed from "components/Profile/ActivityFeed";

function ProfileLeftSection() {
  return (
    <div className="glassBackground p-10 rounded-xl flex flex-col justify-between gap-10">
      <div className="flex justify-between items-center">
        <UserCard />
        <ActivityFeed />
      </div>
      <UserCard />
    </div>
  );
}

export default ProfileLeftSection;
