import React, {useState, useLayoutEffect} from "react";
import { useNavigation } from '@react-navigation/native';
import { Container, Button, ButtonText, Input } from "./styles";

function NewPost(){

    const [post, setPost] = useState('')
    const navigation = useNavigation();

    useLayoutEffect( () => {

        const options = navigation.setOptions({
            headerRight: () => {
                return(
                    <Button>
                        <ButtonText>Compartilhar</ButtonText> 
                    </Button>
                )
            }
        })

    }, [navigation, post])

    return(
        <Container>            
            <Input
            placeholder="O que está acontecendo?"
            placeholderTextColor={'#ddd'}
            maxLength={300}
            value={post}
            onChangeText={ (text) => setPost(text) }
            autoCorrect={false}
            multiline={true}
            />
        </Container>
    )
}

export default NewPost;