import { Divider, Typography } from "@material-ui/core";
import React from "react";
import MatchGallery from "../ChatPage/ProfileInfo/MatchGallery";
import { calculateAge, getGenderColor } from "../../shared/functions";
import LabelValuePrinter from "../ChatPage/ProfileInfo/LabelValuePrinter";
import { DEFAULT_IMAGE_SIZE, DEFAULT_SPACE } from "../../shared/constants";

const ProfileInfo = ({ passiveSideUserId, profiles, setProfiles }) => {
  const isProfilesFilled = () =>
    !!(profiles && Array.isArray(profiles) && profiles.length > 0);
  const passiveSideUser =
    isProfilesFilled() && profiles.find((p) => p.id === passiveSideUserId);
  const age = calculateAge(passiveSideUser?.dateOfBirth);
  return (
    <>
      <MatchGallery
        profileId={passiveSideUserId}
        profiles={profiles}
        setProfiles={setProfiles}
      ></MatchGallery>
      <div style={{ maxWidth: DEFAULT_IMAGE_SIZE }}>
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
              {(age && age !== 0 && age) || ""}
              {passiveSideUser?.distance &&
                passiveSideUser?.distance !== 0 &&
                ` (${passiveSideUser?.distance}km away)`}
            </Typography>
            <Divider></Divider>
          </>
        )}

        {passiveSideUser?.description && (
          <>
            <Typography
              style={{
                padding: DEFAULT_SPACE,
                textAlign: "center",
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
      </div>{" "}
    </>
  );
};

export default ProfileInfo;
