import React from "react";
import styled from "styled-components/native";

interface VotesProps {
    votes:number;
}

const Vo = styled.Text`
    color: rgba(255, 255, 255, 0.8);
    font-size: 10px;
`;

const Votes: React.FC<VotesProps> = ({ votes }) => {
    return (
        <Vo>{votes > 0 ? `${votes}/10` : `Comming soon`}</Vo>
    );
}

export default Votes;