import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { CelebrityList } from "./CelebrityList";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDJhODNjYjA2M2QwZmMwN2YwZjE3NWExM2EyYTY4MiIsInN1YiI6IjY2MTZlNWExYmJkMGIwMDBlN2QxM2I1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fFN58QQPv68wN_YJBvkOSOF_qh-XIi4Vegf2VqZpIC8",
  },
};
interface Props {
  searchTerm: string;
}
const BASE_URL = "https://api.themoviedb.org/3";

export const HomePage = ({ searchTerm }: Props): JSX.Element => {
  const [celebritylistData, setCelebrityListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCelebrity, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const fetchData = async (paginated: boolean, url: string): Promise<void> => {
    fetch(`${BASE_URL}/${url}`, options)
      .then((response) => response.json())
      .then((response) => {
        setTotal(response.total_results);
        console.log("RESPNSE", response);
        if (paginated) {
          setCelebrityListData((cur) => {
            return [...cur, ...response.results];
          });
        } else {
          setCelebrityListData([...response.results]);
        }
      })
      .catch((err) => console.error(err));
    setIsLoading(false);
  };

  useEffect(() => {
    setCelebrityListData([]);
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm === "") {
      fetchData(true, `person/popular?page=${page}`);
    } else {
      fetchData(true, `search/person?query=${searchTerm}&page=${page}`);
    }
  }, [searchTerm, page]);

  const loadNextPage = () => {
    setPage((cur) => cur + 1);
  };

  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        fontSize={25}
        sx={{ color: "#176B87" }}
      ></Typography>
      <InfiniteScroll
        dataLength={totalCelebrity}
        next={loadNextPage}
        hasMore={celebritylistData.length < totalCelebrity}
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
            <b>Yay! You have seen it all</b>
          </p>
        }
        // // below props only if you need pull down functionality
        // refreshFunction={() => {}}
        // pullDownToRefresh
        // pullDownToRefreshThreshold={50}
        // pullDownToRefreshContent={
        //   <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
        // }
        // releaseToRefreshContent={
        //   <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
        // }
      >
        <CelebrityList celebritylistData={celebritylistData} />
      </InfiniteScroll>
      {/* <CelebrityList celebritylistData={celebritylistData} /> */}
    </Container>
  );
};
