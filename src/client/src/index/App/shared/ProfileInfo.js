import { Divider, Typography } from "@material-ui/core";
import React from "react";
import MatchGallery from "../ChatPage/ProfileInfo/MatchGallery";
import { calculateAge, getGenderColor } from "../../shared/functions";
import LabelValuePrinter from "../ChatPage/ProfileInfo/LabelValuePrinter";
import { DEFAULT_SPACE } from "../../shared/constants";

const ProfileInfo = ({ passiveSideUserId, profiles, setProfiles }) => {
  const isProfilesFilled = () =>
    !!(profiles && Array.isArray(profiles) && profiles.length > 0);
  const passiveSideUser =
    isProfilesFilled() && profiles.find((p) => p.id === passiveSideUserId);
  return (
    <>
      <MatchGallery
        profileId={passiveSideUserId}
        profiles={profiles}
        setProfiles={setProfiles}
      ></MatchGallery>
      {isProfilesFilled() && passiveSideUser?.userName && (
        <>
          <Typography
            style={{
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold",
              padding: DEFAULT_SPACE,
              color: getGenderColor(passiveSideUser?.gender),
            }}
          >
            {`${passiveSideUser?.userName} ` || ""}
            {calculateAge(passiveSideUser?.dateOfBirth) || ""}
              {passiveSideUser.distance && ` (${passiveSideUser.distance}km away)`}
          </Typography>
          <Divider></Divider>
        </>
      )}

      {passiveSideUser?.description && (
        <>
          <Typography
            style={{
              padding: DEFAULT_SPACE,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {passiveSideUser?.description || ""}
          </Typography>
          <Divider></Divider>
        </>
      )}

      {passiveSideUser?.university && (
        <>
          <LabelValuePrinter
            label="University"
            value={passiveSideUser?.university || ""}
          ></LabelValuePrinter>
          <LabelValuePrinter
            label="Filed of study"
            value={passiveSideUser?.fieldOfStudy || ""}
          ></LabelValuePrinter>
          <LabelValuePrinter
            label="Already graduated?"
            value={passiveSideUser?.isGraduated ? "yes" : "no"}
          ></LabelValuePrinter>

          <Divider></Divider>
        </>
      )}
      <LabelValuePrinter
        label="City"
        value={passiveSideUser?.city || ""}
      ></LabelValuePrinter>
      <Divider></Divider>
      <LabelValuePrinter
        label="Interests"
        value={passiveSideUser?.interests || []}
      ></LabelValuePrinter>
    </>
  );
};

export default ProfileInfo;
