import React from "react";
import UserCard from "components/Profile/UserCard";
import ActivityFeed from "components/Profile/ActivityFeed";

function ProfileLeftSection() {
  return (
    <div className="glassBackground p-10 rounded-xl">
      <div className="flex justify-between items-center">
        <UserCard />
        <ActivityFeed />
      </div>
      <UserCard />
      <UserCard />
    </div>
  );
}

export default ProfileLeftSection;
