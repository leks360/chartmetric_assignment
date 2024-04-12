import { Box } from "@mui/material";
import { PeopleCard } from "../components/PeopleCard";
import { PersonDetailDialog } from "../components/PersonDetailDialog";
import { useState } from "react";

interface Props {
  celebritylistData: any;
}
export const CelebrityList = ({ celebritylistData }: Props): JSX.Element => {
  const [selectedPerson, setSelectedPerson] = useState(undefined);
  console.log(celebritylistData);
  return (
    <>
      <Box sx={{ height: "100%", display: "flex", gap: 4, flexWrap: "wrap" }}>
        {celebritylistData?.map((celeb) => {
          return (
            <PeopleCard
              onSelect={(person) => setSelectedPerson(person)}
              key={celeb.id}
              celebrityData={celeb}
            />
          );
        })}
      </Box>
      <PersonDetailDialog
        open={selectedPerson !== undefined}
        person={selectedPerson}
        onClose={() => setSelectedPerson(undefined)}
      />
    </>
  );
};
