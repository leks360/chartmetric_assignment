import {
  Badge,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { CelebrityType } from "../types/celebrityTypes";

interface Props {
  celebrityData: CelebrityType;
  onSelect: (person: any) => void;
}
export const PeopleCard = ({ celebrityData, onSelect }: Props): JSX.Element => {
  return (
    <Card
      onClick={() => onSelect(celebrityData)}
      sx={{
        height: 260,
        width: 180,
        "&:hover": {
          transform: "scale3d(1.05, 1.05, 2)",
          transitionProperty: "transform",
          transitionDuration: 500,
        },
      }}
      variant="outlined"
    >
      <Badge
        badgeContent={celebrityData.id}
        max={999}
        color="success"
        // color="#BC7FCD"
        sx={{
          width: "100%",
          height: "100%",
          "& .MuiBadge-badge": {
            // color: "lightgreen",
            // mb: "10px",
            transform: "translate(5px, 6px)",
            backgroundColor: "#891652",
          },
        }}
        // variant="dot"
        // overlap="circular"
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <CardContent sx={{ width: "100%", p: 0, m: 0 }}>
          <CardMedia
            sx={{
              objectFit: "cover",
              height: "100%",
              width: "100%",
              objectPosition: "top",
            }}
            image={`https://image.tmdb.org/t/p/w500${celebrityData.profile_path}`}
            title={celebrityData.name}
          />

          <Box
            sx={{
              position: "absolute",
              bottom: "0px",
              width: "100%",
              height: "20px",
              p: 1,
              // filter: "blur(1px)",
              // WebkitFilter: "blur(1px)",
              backdropFilter: "blur(8px)",
              boxShadow: "inset 0px 0px 35px 0px #3C3633",
              // backgroundColor: "red",
            }}
          >
            <Typography
              variant="body2"
              fontWeight={600}
              fontSize={12}
              color="white"
              sx={{
                fontFamily: "sans-serif",
                // p: 1,
                // textAlign: "center",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {celebrityData.name}
            </Typography>
          </Box>
        </CardContent>
      </Badge>
    </Card>
  );
};
