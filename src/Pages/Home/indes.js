import React, {useState, useContext, useCallback} from "react";
import {View, Text, ActivityIndicator} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import Header from "../../Components/Header";
import PostsList from "../../Components/PostsList";
import { AuthContext } from "../../Context/Auth";

import { Container, ButtonPost, ListPosts } from "./styles";


function Home(){

    const navigation = useNavigation()
    const {user} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    const [posts, setPosts] = useState([])

    const [loadingRefresh, setLoadingRefresh] = useState(false);
    const [lastItem, setLastItem] = useState('');
    const [emptyList, setEmptyList] = useState(false);

    // Buscando dados de Posts do meu banco de dados 
    useFocusEffect(
        useCallback( () => {

            let isActive = true;

            function fetchPosts(){
                firestore().collection('posts')
                .orderBy('created', 'desc')
                .limit(6)
                .get()
                .then( (snapshot) => {
                    if(isActive){
                        setPosts([]);
                        const postList = [];

                        snapshot.docs.map(u => {
                            postList.push({
                                ...u.data(),
                                id: u.id,
                            })
                        })
                        setPosts(postList);
                        setLastItem(snapshot.docs[snapshot.docs.length - 1])
                        setEmptyList(!!snapshot.empty)
                        setLoading(false);
                    }
                })
            }

            fetchPosts();

            return() => {
                isActive = false
            }

        }, [])
    )
    
    // Carregando novos Posts na pagina Home
    async function handleRefreshPosts(){
        setLoadingRefresh(true)

            firestore().collection('posts')
            .orderBy('created', 'desc')
            .limit(6)
            .get()
            .then( (snapshot) => {
                    setPosts([]);
                    const postList = [];

                    snapshot.docs.map(u => {
                        postList.push({
                            ...u.data(),
                            id: u.id,
                        })
                    })
                    setPosts(postList);
                    setLastItem(snapshot.docs[snapshot.docs.length - 1])
                    setEmptyList(!!snapshot.empty)
                    setLoading(false);
                
            })
        setLoadingRefresh(false)
    }

    // Buscar mais Posts ao chegar no final da lista
    async function getListPosts(){
        if(emptyList){

            setLoading(false)
            return null;
        }

        if(loading) return;

        firestore().collection('posts')
        .orderBy('created', 'desc')
        .limit(5)
        .startAfter(lastItem)
        .get()
        .then( (snapshot) => {
            const postList = [];

            snapshot.docs.map( u => {
                postList.push({
                    ...u.data(),
                    id: u.id,
                })
            })

            setEmptyList(!!snapshot.empty);
            setLastItem(snapshot.docs[snapshot.docs.length - 1]);
            setPosts(oldPost => [...oldPost, ...postList]);
            setLoading(false)
        })
    }


    return(
        <Container>
            <Header/>

            {loading ? (
                <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <ActivityIndicator size={50} color="#e52246"/>
                </View>
            ) : (
                <ListPosts
                showsVerticalScrollIndicator={false}
                data={posts}
                renderItem={({item}) => (
                    <PostsList
                    data={item}
                    userId={user?.uid}
                    />
                )}

                refreshing={loadingRefresh}
                onRefresh={handleRefreshPosts}
                onEndReached={() => getListPosts()}
                onEndReachedThreshold={0.1}
                />
            )}


            <ButtonPost activeOpacity={0.5} onPress={ () => navigation.navigate('NewPost')}>
                <Feather
                name="edit-2"
                color="#fff"
                size={25}
                />
            </ButtonPost>
        </Container>
    )
}

export default Home;