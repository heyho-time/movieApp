import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions, ActivityIndicator, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Swiper from "react-native-swiper";
import { useEffect } from "react";
import Slide from "../components/Slide";
import Poster from "../components/Poster";

const API_KEY = "d7212f491766d49858f9380583cb30bd";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);

  const getTrending = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      )
    ).json();
    setTrending(results);
  };

  const getUpcoming = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      )
    ).json();
    setUpcoming(results);
  };

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();

    setNowPlaying(results);
  };

  const getData = async () => {
    await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container>
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
        {nowPlaying.map((movie) => (
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
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 30 }}
        >
          {trending.map((movie) => (
            <Movie key={movie.id}>
              <Poster path={movie.poster_path} />
              <Title>
                {movie.original_title.slice(0, 13)}
                {movie.original_title.length > 13 ? "..." : null}
              </Title>
              {movie.vote_average > 0 ? (
                <Votes>⭐ {movie.vote_average}/10</Votes>
              ) : (
                `Coming soon`
              )}
            </Movie>
          ))}
        </TrendingScroll>
      </ListContainer>
      <ComingSoon>Coming soon</ComingSoon>
      {upcoming.map((movie) => (
        <HMovie key={movie.id}>
          <Poster path={movie.poster_path} />
          <HColumn>
            <Title>{movie.original_title}</Title>
            <Release>
              {new Date(movie.release_date).toLocaleDateString("ko")} 개봉
            </Release>
            <OverView>
              {movie.overview !== "" && movie.overview.length > 13
                ? `${movie.overview.slice(0, 140)}...`
                : movie.overview}
            </OverView>
          </HColumn>
        </HMovie>
      ))}
    </Container>
  );
};

const Container = styled.ScrollView``;

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
  margin-right: 30px;
  align-items: center;
`;

const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
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
