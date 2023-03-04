import React from "react";
import styled from "styled-components/native";
import { BlurView } from "expo-blur";
import { makeImgPath } from "../utils";
import { View, StyleSheet, useColorScheme } from "react-native";
import Poster from "./Poster";

const BgImg = styled.Image`
    flex: 1
`;
const Wrapper = styled.View`
    flex-direction: row;
    height: 100%;
    justify-content: space-around;
    align-item: center;
`;

const Column = styled.View`
    width: 60%
`;
const Title = styled.Text<{ isDark: boolean }>`
    font-size: 16px;
    font-weight: 600;
    color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;
const Overview = styled.Text<{ isDark : boolean }>`
    margin-top: 10px;
    color: ${(props) => (props.isDark ? "rgba(255, 255, 255, 0.8);" : "rgba(0, 0, 0, 0.8);")}; 
`;
const Vote = styled(Overview)`
    font-size : 12px;
`;

interface SlideProps {
    backdropPath:string;
    posterPath:string;
    originalTitle:string;
    voteAverage:number;
    overview:string;
}

const Slide:React.FC<SlideProps> = ({
    backdropPath,
    posterPath,
    originalTitle,
    voteAverage,
    overview,
}) => {
    const isDark = useColorScheme() === "dark";
    return (
        <View style={{flex : 1}}>
            <BgImg 
                style={StyleSheet.absoluteFill}
                source={{uri:makeImgPath(backdropPath)}} 
            />
            <BlurView 
                tint={isDark ? "dark" : "light"}
                intensity={95}
                style={StyleSheet.absoluteFill}
            >
                <Wrapper>
                    <Poster path={posterPath}/>
                    <Column>
                        <Title isDark={isDark}>{originalTitle}</Title>
                        {voteAverage > 0 ? (
                            <Vote isDark={isDark}>⭐️{voteAverage}/10</Vote>
                        ) : null}
                        <Overview isDark={isDark}>
                            {overview.slice(0, 100)}
                        </Overview>
                    </Column>
                </Wrapper> 
            </BlurView>
        </View>
    );
};

export default Slide;


