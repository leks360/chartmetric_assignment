import { Grid } from "@mui/material";
import { PeopleCard } from "../components/PeopleCard";
import { PersonDetailDialog } from "../components/PersonDetailDialog";
import { useState } from "react";
import { CelebrityType } from "../types/celebrityTypes";

interface Props {
  celebritylistData: CelebrityType[];
}
export const CelebrityList = ({ celebritylistData }: Props): JSX.Element => {
  const [selectedPerson, setSelectedPerson] = useState(undefined);

  return (
    <>
      {/* <Box sx={{ height: "100%", display: "flex", gap: 4, flexWrap: "wrap" }}> */}
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 4, sm: 12, md: 12, lg: 12 }}
        sx={{ minHeight: "100px", overflowX: "hidden" }}
      >
        {celebritylistData?.map((celeb) => {
          return (
            <Grid item xs={4} sm={4} md={3} lg={2} key={celeb.id + celeb.name}>
              <PeopleCard
                onSelect={(person) => setSelectedPerson(person)}
                celebrityData={celeb}
              />
            </Grid>
          );
        })}
      </Grid>
      {/* </Box> */}
      <PersonDetailDialog
        open={selectedPerson !== undefined}
        person={selectedPerson}
        onClose={() => setSelectedPerson(undefined)}
      />
    </>
  );
};
