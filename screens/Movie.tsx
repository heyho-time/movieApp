import React from "react";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const MovieScreen: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation: { navigate },
}) => (
  <>
    <Btn
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      onPress={() => navigate("Stack", { screen: "Three" })}
    >
      <Title>Movie</Title>
    </Btn>
    <Footer />
  </>
);

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

const Footer = styled.View``;

export default MovieScreen;