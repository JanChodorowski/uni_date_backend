import { Divider, Typography } from "@material-ui/core";
import React from "react";
import MatchGallery from "../ChatPage/ProfileInfo/MatchGallery";
import { calculateAge, getGenderColor } from "../../shared/functions";
import LabelValuePrinter from "../ChatPage/ProfileInfo/LabelValuePrinter";
import { DEFAULT_SPACE } from "../../shared/constants";

const ProfileInfo = ({ passiveSideUserId, profiles, setProfiles }) => {
  return (
    <>
      <MatchGallery
        profileId={passiveSideUserId}
        profiles={profiles}
        setProfiles={setProfiles}
      ></MatchGallery>
      {profiles &&
        Array.isArray(profiles) &&
        profiles.length > 0 &&
        profiles.find((p) => p.id === passiveSideUserId) &&
        profiles.find((p) => p.id === passiveSideUserId)?.userName && (
          <>
            <Typography
              style={{
                display: "flex",
                justifyContent: "center",
                fontWeight: "bold",
                padding: DEFAULT_SPACE,
                color: getGenderColor(
                  profiles.find((p) => p.id === passiveSideUserId)?.gender
                ),
              }}
            >
              {`${
                profiles.find((p) => p.id === passiveSideUserId)?.userName
              } ` || ""}
              {calculateAge(
                profiles.find((p) => p.id === passiveSideUserId)?.dateOfBirth
              ) || ""}
            </Typography>
            <Divider></Divider>
          </>
        )}

      {profiles.find((p) => p.id === passiveSideUserId)?.description && (
        <>
          <Typography
            style={{
              padding: DEFAULT_SPACE,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {profiles.find((p) => p.id === passiveSideUserId)?.description ||
              ""}
          </Typography>
          <Divider></Divider>
        </>
      )}

      {profiles.find((p) => p.id === passiveSideUserId) &&
        profiles.find((p) => p.id === passiveSideUserId).university && (
          <>
            <LabelValuePrinter
              label="University"
              value={
                profiles.find((p) => p.id === passiveSideUserId)?.university ||
                ""
              }
            ></LabelValuePrinter>
            <LabelValuePrinter
              label="Filed of study"
              value={
                profiles.find((p) => p.id === passiveSideUserId)
                  ?.fieldOfStudy || ""
              }
            ></LabelValuePrinter>
            <LabelValuePrinter
              label="Already graduated?"
              value={
                profiles.find((p) => p.id === passiveSideUserId)?.isGraduated
                  ? "yes"
                  : "no"
              }
            ></LabelValuePrinter>

            <Divider></Divider>
          </>
        )}
      <LabelValuePrinter
        label="City"
        value={profiles.find((p) => p.id === passiveSideUserId)?.city || ""}
      ></LabelValuePrinter>
      <Divider></Divider>
      <LabelValuePrinter
        label="Interests"
        value={
          profiles.find((p) => p.id === passiveSideUserId)?.interests || []
        }
      ></LabelValuePrinter>
    </>
  );
};

export default ProfileInfo;
