import React from "react";
import { useRouter } from "next/router";
import MeetupDetail from "@/components/meetups/MeetupDetail";
export default function index() {
  const router = useRouter();
  const meetupId = router.query.meetupId;
  console.log(meetupId);
  return (
    <MeetupDetail
      image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg"
      title="First Meetup"
      address="Some Street 5, Some City"
      description="This is a first meetup"
    />
  );
}
