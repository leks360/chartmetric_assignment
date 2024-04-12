import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  LiveTvOutlined,
  Theaters,
  TheatersOutlined,
} from "@mui/icons-material";

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
  if (!person) return;
  return (
    <Dialog open={open} fullWidth maxWidth="md">
      <DialogTitle>
        <Typography variant="h5" fontWeight={600}>
          {person.name}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ pb: 0, mb: 0 }}>
        <Grid container>
          <Grid item xs={12} md={5}>
            <CardMedia
              sx={{
                objectFit: "cover",
                height: "380px",
                width: "100%",
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
              pl: 4,
              position: "relative",
              height: "380px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="body1" fontSize={20} sx={{ lineHeight: 1.6 }}>
              Gender : {person?.gender === 1 ? "Female" : "Male" || "unknown"}
              <br />
              Popularity : {person?.popularity || "NA"}
            </Typography>

            <Typography mt={1} variant="body1" fontSize={18} fontWeight={600}>
              Known For
            </Typography>
            <Box
              sx={{
                // height: "inherit",
                // height: "100%",
                // overflow: "hidden",
                // width: "100%",
                overflowY: "scroll",
                overflowX: "hidden",
                // display: "flex",
                // flexWrap: "wrap",
              }}
            >
              {person?.known_for?.map((item) => {
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
                        height: "100%",
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
                        image={`https://image.tmdb.org/t/p/w500${item?.poster_path}`}
                        title={person?.name}
                      />
                      <Box sx={{ p: 1 }}>
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
                          {new Date(item.release_date).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
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
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
