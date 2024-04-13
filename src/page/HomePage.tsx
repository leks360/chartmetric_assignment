import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { CelebrityList } from "../components/CelebrityList";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CelebrityType } from "../types/celebrityTypes";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_API_TOKEN,
  },
};
interface Props {
  searchTerm: string | undefined;
}
const BASE_URL = "https://api.themoviedb.org/3";

export const HomePage = ({ searchTerm }: Props): JSX.Element => {
  const [celebritylistData, setCelebrityListData] = useState<CelebrityType[]>(
    []
  );
  const [totalCelebrity, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async (paginated: boolean, url: string): Promise<void> => {
    setIsLoading(true);
    fetch(`${BASE_URL}/${url}`, options)
      .then((response) => response.json())
      .then((response) => {
        setTotal(response.total_results);

        if (paginated) {
          setCelebrityListData((cur) => {
            return [...cur, ...response.results];
          });
        } else {
          setCelebrityListData([...response.results]);
        }
        setIsLoading(false);
      })
      .catch((err) => setIsLoading(false));
  };

  useEffect(() => {
    setPage(1);
    setCelebrityListData((cur) => []);
  }, [searchTerm]);

  useEffect(() => {
    const getData = async (): Promise<void> => {
      if (searchTerm === "" || searchTerm === undefined) {
        await fetchData(true, `person/popular?page=${page}`);
      } else {
        await fetchData(true, `search/person?query=${searchTerm}&page=${page}`);
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, page]);

  const loadNextPage = () => {
    setPage((cur) => cur + 1);
  };

  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        fontSize={30}
        sx={{ color: "#176B87", mb: 2 }}
      >
        Celebrities
      </Typography>
      <InfiniteScroll
        dataLength={celebritylistData.length}
        next={loadNextPage}
        hasMore={celebritylistData?.length < totalCelebrity}
        loader={
          <Box
            sx={{
              my: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress
              sx={{ px: "auto", textAlign: "center", alignContent: "center" }}
            />
          </Box>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <Typography variant="caption" fontSize={18}>
              {isLoading
                ? "Loading Data..."
                : celebritylistData?.length === 0
                ? "Couldnt find any celebrity!"
                : "End of data"}
            </Typography>
          </p>
        }
      >
        <CelebrityList celebritylistData={celebritylistData} />
      </InfiniteScroll>
    </Container>
  );
};
