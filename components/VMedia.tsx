import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

interface VMediaProps {
    posterPath:string;
    originalTitle:string;
    voteAverage:number;
}

const Movie = styled.View`
    align-items: center;
`;
const Title = styled.Text`
    color : white;
    font-weight: 600;
    magin-top:7px;
    margi_bottom:10px;
    font-size : 12px;
`;

const VMedia : React.FC<VMediaProps> = ({
    posterPath,
    originalTitle,
    voteAverage,
}) => {
    return (
        <Movie>
            <Poster path={posterPath} />
            <Title>
                {originalTitle.slice(0, 13)}
                {originalTitle.length > 13 ? "..." : null}
            </Title>
            <Votes votes={voteAverage} />
        </Movie>
    );
}

export default VMedia;

