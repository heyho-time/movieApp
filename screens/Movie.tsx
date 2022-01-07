import React, { useState } from "react";
import styled from "styled-components/native";
import {
  Dimensions,
  ActivityIndicator,
  RefreshControl,
  FlatList,
  View,
  Text,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Swiper from "react-native-swiper";
import { useEffect } from "react";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { moviesApi } from "../api";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const movieKeyExtractor = (item) => item.id + "";

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery(
    "nowPlaying",
    moviesApi.nowPlaying
  );
  const { isLoading: upcomingLoading, data: upcomingData } = useQuery(
    "upcoming",
    moviesApi.getUpcoming
  );
  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    "trending",
    moviesApi.getTrending
  );

  // 기존 fetch 방식 @!@!@!@!@!@!@!@!@!@!

  // const [loading, setLoading] = useState(true);
  // const [nowPlaying, setNowPlaying] = useState([]);
  // const [upcoming, setUpcoming] = useState([]);
  // const [trending, setTrending] = useState([]);

  // const getTrending = async () => {
  //   const { results } = await (
  //     await fetch(
  //       `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
  //     )
  //   ).json();
  //   setTrending(results);
  // };

  // const getUpcoming = async () => {
  //   const { results } = await (
  //     await fetch(
  //       `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
  //     )
  //   ).json();
  //   setUpcoming(results);
  // };

  // const getNowPlaying = async () => {
  //   const { results } = await (
  //     await fetch(
  //       `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
  //     )
  //   ).json();

  //   setNowPlaying(results);
  // };

  // const getData = async () => {
  //   await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  const onRefresh = async () => {};

  const renderVMedia = ({ item }) => (
    <VMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      voteAverage={item.vote_average}
    />
  );

  const renderHMedia = ({ item }) => (
    <HMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
    />
  );

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            loop
            horizontal
            autoplay={true}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              marginBottom: 30,
              width: "100%",
              height: SCREEN_HEIGHT / 4,
            }}
          >
            {nowPlayingData.results.map((movie) => (
              <Slide
                key={movie.id}
                backdrop_path={movie.backdrop_path}
                poster_path={movie.poster_path}
                original_title={movie.original_title}
                vote_average={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            <TrendingScroll
              data={trendingData.results}
              horizontal
              keyExtractor={movieKeyExtractor}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 30 }}
              ItemSeparatorComponent={VSeparator}
              renderItem={renderVMedia}
            />
          </ListContainer>
          <ComingSoon>Coming soon</ComingSoon>
        </>
      }
      data={upcomingData.results}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={HSeparator}
      renderItem={renderHMedia}
    />
  );
};

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const Movie = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;
const Votes = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`;

const HMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
  margin-bottom: 30px;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const OverView = styled.Text`
  color: white;
  opacity: 0.8;
  width: 80%;
`;

const Release = styled.Text`
  margin-vertical: 10px;
  color: rgba(255, 255, 255, 0.8);
`;

const ComingSoon = styled(ListTitle)`
  margin-bottom: 30px;
`;

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;

const VSeparator = styled.View`
  width: 20px;
`;

const HSeparator = styled.View`
  height: 20px;
`;

export default Movies;

// General

// import React from "react";
// import styled from "styled-components/native";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";

// const MovieScreen: React.FC<NativeStackScreenProps<any, "Movies">> = ({
//   navigation: { navigate },
// }) => (
//   <>
//     <Btn
//       style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
//       onPress={() => navigate("Stack", { screen: "Three" })}
//     >
//       <Title>Movie</Title>
//     </Btn>
//     <Footer />
//   </>
// );

// const Btn = styled.TouchableOpacity`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
//   background-color: ${(props) => props.theme.mainBgColor};
// `;

// const Title = styled.Text`
//   color: ${(props) => props.theme.textColor};
// `;

// const Footer = styled.View``;

// export default MovieScreen;
