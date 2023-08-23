import React, {useState} from "react";
import { Container, Name, Header, Avatar, Content, ContentView, Actions, LikeButton, Like, TimePost } from "./styles";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatDistance } from 'date-fns';
import firestore from '@react-native-firebase/firestore';
import { ptBR } from 'date-fns/locale';
import { useNavigation } from "@react-navigation/native";

function PostList({ data, userId}){

    const navigation = useNavigation()
    const [likePost, setLikePost] = useState(data?.likes)

    // Formatando a distacia do tempo de postagem do usuario
    function formatTimePost(){
        //console.log(new Date(data.created.seconds * 1000)); CREATE DATE
        const datePost = new Date( data.created.seconds * 1000)
 
        return formatDistance(
            new Date(),
            datePost,
            {
                locale: ptBR
            }
        )
    }

    // Função para dar ou tirar likes de uma postagem
    async function handleLikePost(id, likes){ 
        const docId = `${userId}_${id}`

        // Checar se ja foi curtido por mim
        const doc = await firestore().collection('likes')
        .doc(docId).get();

        if(doc.exists){
            //quer dizer que ja curtiu, precisamos remover o like 
            await firestore().collection('posts')
            .doc(id).update({
                likes: likes -1
            })

            await firestore().collection('likes').doc(docId)
            .delete()
            .then(() => {
                setLikePost(likes -1)
            })
            return;
        }

        // Precisamos dar o like no post
        await firestore().collection('likes')
        .doc(docId).set({
            postId: id,
            userId: userId,
        })
        
        await firestore().collection('posts')
        .doc(id).update({
            likes: likes + 1
        })
        .then( () => {
            setLikePost(likes + 1)
        })
    }   

    return(
        <Container>
            <Header onPress={() => navigation.navigate('PostsUser', {title: data.autor, userId: data.userId})}>
                {data.avatarUrl ? (
                    <Avatar
                    source={{uri: data.avatarUrl}}
                    />
                ) : (
                    <Avatar
                    source={require('../../assets/avatar.png')}
                    />
                )}
            
                <Name numberOfLines={1}>
                    {data?.autor}
                </Name>
            </Header>

            <ContentView>
                <Content>{data?.content}</Content>
            </ContentView>

            <Actions>
                <LikeButton onPress={() => handleLikePost(data.id, likePost)}>
                    <Like>
                        {likePost === 0 ? '' : likePost}
                    </Like>
                    <MaterialCommunityIcons
                    name={likePost === 0 ? "heart-plus-outline" : "cards-heart"}
                    size={20}
                    color="#e52246"
                    />
                </LikeButton>

                <TimePost>
                    {formatTimePost()}
                </TimePost>
            </Actions>

        </Container>
    )
}

export default PostList;