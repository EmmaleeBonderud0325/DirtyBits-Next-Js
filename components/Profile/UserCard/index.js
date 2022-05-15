import { Avatar, Button, Image, Progress, Text } from "@mantine/core";
// import Image from "next/image";
import React from "react";
import { BsArrowRightShort } from "react-icons/bs";
import Card from "components/Profile/Card";
import { Divider } from "@mantine/core";
import { VerificationIcon, GearIcon } from "SVG";

function UserCard() {
  return (
    <div className="space-y-4">
      <div className="text-white md:flex md:items-start space-x-10">
        <div className="flex flex-col items-center space-y-10">
          <Image
            src="https://bestprofilepictures.com/wp-content/uploads/2021/04/Awesome-Profile-Pic.jpg"
            width={200}
            height={200}
            alt="profile pic"
          />
          <div className="flex items-center space-x-4">
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
            <h1 className="text-xl tracking-widest">Animal Planet_11</h1>
            <VerificationIcon />
          </div>
          <Button
            rightIcon={<BsArrowRightShort className="text-2xl" />}
            variant="filled"
            size="sm"
          >
            GO PREMIUM
          </Button>
          <p>You need 300xp to Rookie</p>
          <Progress color="cyan" size="sm" value={50} />
          <div className="flex gap-5">
            <Card color="#C6F48A" />
            <Card color="#13F1FF" />
            <Card color="#FC78EF" />
            <Card child="+32" color="#E2E4F1" />
          </div>
        </div>
      </div>
      <Divider my="sm" />
      <div></div>
    </div>
  );
}

export default UserCard;
