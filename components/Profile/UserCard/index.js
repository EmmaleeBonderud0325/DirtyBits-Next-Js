import { Button, Image, Progress, Text } from "@mantine/core";
// import Image from "next/image";
import React from "react";
import { BsArrowRightShort } from "react-icons/bs";
import Card from "components/Profile/Card";
import { Divider } from "@mantine/core";
import {
  VerificationIcon,
  GearIcon,
  AchievementIcon,
  AchievementIcon2,
  AchievementIcon3,
  PieIcon,
  CreditCardIcon,
  ChartIcon,
} from "SVG";
import StyledCard from "components/Profile/StyledCard";

function UserCard() {
  return (
    <div className="space-y-4 font-secondary">
      <div className="text-white md:flex md:items-start space-x-10">
        <div className="flex flex-col items-center space-y-10">
          <Image
            src="https://bestprofilepictures.com/wp-content/uploads/2021/04/Awesome-Profile-Pic.jpg"
            width={200}
            height={200}
            alt="profile pic"
            className="rounded-md"
          />
          <div className="flex items-center space-x-4 cursor-pointer">
            <GearIcon />
            <Text color="dimmed" className="font-semibold">
              Edit Profile
            </Text>
          </div>
        </div>
        <div className="space-y-6">
          <Text color="dimmed" size="sm" variant="text">
            Newbie
          </Text>
          <div className="flex items-center space-x-5">
            <h1 className="text-xl tracking-widest font-secondary">
              Animal Planet_11
            </h1>
            <VerificationIcon />
          </div>
          <Button
            rightIcon={<BsArrowRightShort className="text-2xl" />}
            variant="filled"
            size="sm"
            className="font-secondary tracking-wide"
          >
            GO PREMIUM
          </Button>
          <p className="tracking-wider font-secondary">
            You need 300xp to Rookie
          </p>
          <Progress color="cyan" size="sm" value={50} />
          <div className="flex gap-5">
            <Card child={<AchievementIcon3 />} color="C6F48A" />
            <Card child={<AchievementIcon2 />} color="13F1FF" />
            <Card child={<AchievementIcon />} color="FC78EF" />
            <Card child="+32" color="E2E4F1" />
          </div>
        </div>
      </div>
      <Divider my="sm" />
      <div className="flex items-center gap-8">
        <StyledCard icon={<PieIcon />} label="Total Matches" value="360" />
        <StyledCard
          icon={<CreditCardIcon />}
          label="Total Events"
          value="120"
        />
        <StyledCard icon={<ChartIcon />} label="Total Followers" value="2500" />
      </div>
    </div>
  );
}

export default UserCard;
