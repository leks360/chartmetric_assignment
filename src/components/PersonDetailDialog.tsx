import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  CancelPresentationOutlined,
  LiveTvOutlined,
  TheatersOutlined,
} from "@mui/icons-material";
import { Knownfor } from "../types/celebrityTypes";

interface Props {
  open: boolean;
  person: any;
  onClose: () => void;
}
export const PersonDetailDialog = ({
  open,
  person,
  onClose,
}: Props): JSX.Element => {
  if (!person) return <div></div>;
  return (
    <Dialog open={open} fullWidth maxWidth="md">
      {/* <DialogTitle>
      </DialogTitle> */}
      <DialogContent sx={{ p: 0, m: 0 }}>
        <Chip
          sx={{
            position: "absolute",
            top: "10px",
            ml: 2,
            backdropFilter: "blur(8px)",
            boxShadow: "inset 0px 0px 35px 0px #3C3633",
          }}
          label={
            <Typography
              variant="h5"
              fontWeight={600}
              fontSize={28}
              color="white"
            >
              {person.name}
            </Typography>
          }
          variant="outlined"
        />

        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12} md={5}>
            <CardMedia
              sx={{
                objectFit: "cover",

                // width: "100%",
                height: "400px",
                objectPosition: "bottom",
              }}
              image={`https://image.tmdb.org/t/p/w500${person?.profile_path}`}
              title={person?.name}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={7}
            sx={{
              //   m: 1,
              pl: 2,
              //   mr:1,

              //   position: "relative",
              height: "400px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="body1"
              fontSize={20}
              mt={2}
              px={2}
              sx={{ lineHeight: 1.6 }}
              fontWeight={600}
            >
              Gender : {person?.gender === 1 ? "Female" : "Male" || "unknown"}
              <br />
              Popularity : {person?.popularity || "NA"}
            </Typography>

            <Typography
              px={2}
              mt={1}
              variant="body1"
              fontSize={18}
              fontWeight={300}
            >
              Known For
            </Typography>
            <Box
              sx={{
                px: 2,
                overflowY: "scroll",
                overflowX: "hidden",
              }}
            >
              {person?.known_for?.map((item: Knownfor) => {
                return (
                  <Card
                    key={item.id}
                    variant="outlined"
                    sx={{ my: 2, width: "95%", p: 0 }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        gap: 1,
                        p: 0,
                        m: 0,
                        "&:last-child": {
                          paddingBottom: 0,
                        },
                        height: "120px",
                      }}
                    >
                      <CardMedia
                        sx={{
                          objectFit: "cover",
                          height: "100%",
                          width: 100,
                          p: 0,
                          m: 0,
                          flexShrink: 0,
                        }}
                        image={`https://image.tmdb.org/t/p/w200${item?.poster_path}`}
                        title={person?.name}
                      />
                      <Box sx={{ p: 1.5 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "top",
                            gap: 1,
                            mb: 0.5,
                          }}
                        >
                          <Tooltip title={item.media_type}>
                            {item.media_type === "tv" ? (
                              <LiveTvOutlined />
                            ) : (
                              <TheatersOutlined />
                            )}
                          </Tooltip>
                          <Typography
                            variant="body1"
                            fontWeight={600}
                            sx={{ pt: 0.34 }}
                          >
                            {item.title || item.name}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Rating
                            name="read-only"
                            value={item.vote_average / 2}
                            precision={0.5}
                            readOnly
                          />
                          <Typography fontWeight={50} fontSize={13}>
                            ({item.vote_count})
                          </Typography>
                        </Box>
                        <Typography mt={1} variant="body2" fontWeight={100}>
                          {item?.release_date
                            ? new Date(item.release_date).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )
                            : "Not Known"}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <IconButton
        sx={{ position: "absolute", top: "5px", right: "5px" }}
        onClick={onClose}
      >
        <CancelPresentationOutlined />
      </IconButton>
    </Dialog>
  );
};
