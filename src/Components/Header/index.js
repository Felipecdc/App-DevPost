import React from "react";
import { Container, Title } from "./styles";
import { Text } from "react-native";

function Header(){
    return(
        <Container>
            <Title>
                Dev
                <Text style={{color: '#e52246', fontStyle: "italic", fontWeight: "bold"}}>Post</Text>
                </Title> 
        </Container>
    )
}

export default Header;