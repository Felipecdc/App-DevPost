import React, {useState, useLayoutEffect, useContext} from "react";
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { AuthContext } from "../../Context/Auth";

import { View, Text, Keyboard } from "react-native";
import { Container, Button, ButtonText, Input } from "./styles";

function NewPost(){

    const {user} = useContext(AuthContext);
    const [post, setPost] = useState('')
    const navigation = useNavigation();
    const [loadingPost, setLoadingPost] = useState(false);

    useLayoutEffect( () => {

        const options = navigation.setOptions({
            headerRight: () => {
                return(
                    <Button onPress={() => handlePost()}>
                        <ButtonText>Compartilhar</ButtonText> 
                    </Button>
                )
            }
        })

    }, [navigation, post])

    async function handlePost(){
        setLoadingPost(true)
        Keyboard.dismiss()
        if(post === ""){
            console.log("Seu post contem conteudo invalido")
            setLoadingPost(false)
            return;
        }

        let avatarUrl = null;

        try{
            let response = await storage().ref('users').child(user?.uid).getDownloadURL();
            avatarUrl = response;
        }catch(err){
            avatarUrl = null
        }

        await firestore().collection('posts')
        .add({
            created: new Date(),
            content: post,
            autor: user?.nome,
            userId: user?.uid,
            likes: 0,
            avatarUrl,
        })
        .then( () => {
            setPost('')
            console.log('POST CRIADO COM SUCESSO')
        })
        .catch( (err) => {
            console.log("ERRO AO RIAR POST: ", err)
        })

        setLoadingPost(false)
        navigation.goBack();

    }

    return(
        <Container>            

            {loadingPost ? (
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Text style={{color: '#999', fontSize: 25}}>Postando...</Text>
                </View>
            ):(
                <Input
                placeholder="O que está acontecendo?"
                placeholderTextColor={'#ddd'}
                maxLength={300}
                value={post}
                onChangeText={ (text) => setPost(text) }
                autoCorrect={false}
                multiline={true}
                />
            )}
        </Container>
    )
}

export default NewPost;