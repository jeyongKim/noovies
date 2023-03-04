import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { FlatList, RefreshControl } from "react-native";
import { ActivityIndicator, Dimensions, View } from "react-native";
import Swiper from 'react-native-swiper';
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { isTemplateExpression } from "typescript";
import { moviesApi } from "../api";
import HMedia from "../components/HMedia";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";


const Container = styled.ScrollView``;
const Loader = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const { height : SCREEN_HEIGHT } = Dimensions.get("window");
//or
//const SCREEN_HEIGHT = Dimension.get("window").height;

const ListTitle = styled.Text`
    color: white;
    font-size: 18px;
    font-weight: 600;
    margin-left:20px;
`;
const TrendingScroll = styled.FlatList`
    margin-top: 20px;
`;
const ListContainer = styled.View`
    margin-bottom : 40px;
`;
const ComingSoonTitle = styled(ListTitle)`
    margin-bottom : 20px;
`;
const VSeparator = styled.View`
    width : 20px;
`;
const HSeparator = styled.View`
    height : 20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
    
    const { 
        isLoading: nowPlayingLoading, 
        data: nowPlayingData, 
        refetch: refetchNowPlaying, 
        isRefetching: isRefetchingNowPlaying,
    } = useQuery("nowPlaying", moviesApi.nowPlaying );
    const { 
        isLoading: upcomingLoading, 
        data: upcomingData, 
        refetch: refetchUpcoming, 
        isRefetching: isRefetchingUpcoming,
    } = useQuery("upcoming", moviesApi.upcoming );
    const { 
        isLoading: trendingLoading, 
        data: trendingData, 
        refetch: refetchTrending, 
        isRefetching: isRefetchingTrending,
    } = useQuery("trending", moviesApi.trending );

    const onRefresh = async () => {
        refetchNowPlaying();
        refetchUpcoming();
        refetchTrending();
    }; 
    
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
    
    const movieKeyExtractor = (item) => item.id + "";
    const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
    const refreshing = isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending;
    
    return loading ? (
        <Loader>
            <ActivityIndicator />
        </Loader>
    ) : (
        <FlatList 
            onRefresh={onRefresh}
            refreshing={refreshing}
            ListHeaderComponent={<>
                <Swiper 
                    horizontal
                    loop
                    autoplay
                    autoplayTimeout={3.5}
                    showsButtons={false}
                    showsPagination={false}
                    containerStyle={{ width:"100%", height: SCREEN_HEIGHT/4, marginBottom : 30 }}
                >
                    {nowPlayingData.results.map((movie) => (
                        <Slide 
                            key={movie.id} 
                            backdropPath={movie.backdrop_path}
                            posterPath={movie.poster_path}
                            originalTitle={movie.original_title}
                            voteAverage={movie.vote_average}
                            overview={movie.overview}
                        />
                    ))}
                </Swiper>
                <ListContainer>
                    <ListTitle>Trending Movies</ListTitle>
                    <TrendingScroll 
                        data={trendingData.results}
                        keyExtractor={movieKeyExtractor}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={ { paddingLeft: 30} }
                        ItemSeparatorComponent={VSeparator}
                        renderItem={renderVMedia}
                    />    
                </ListContainer>
                <ComingSoonTitle>Coming soon</ComingSoonTitle>
                </>
            }
            data={upcomingData}
            keyExtractor={movieKeyExtractor}
            ItemSeparatorComponent={HSeparator}        
            renderItem={renderHMedia}
        />
    );
};

export default Movies;
