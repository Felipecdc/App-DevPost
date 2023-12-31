import React, {useContext, useState} from "react";
import { View, Text, Modal, Platform } from 'react-native';
import { AuthContext } from "../../Context/Auth";
import firestore from '@react-native-firebase/firestore';
import { Container, Name, Button, ButtonText, Email, UploadButton, UploadText, Avatar, ModalContainer, ButtonBack, Input } from "./styles";

import Feather from 'react-native-vector-icons/Feather'
import Header from "../../Components/Header";

function Profile(){

    const {signOut, user, setUser, storageUser} = useContext(AuthContext)

    const [nome, setNome] = useState(user?.nome)
    const [url, setUrl] = useState(null)
    const [open, setOpen] = useState(false)

    // Sair da conta
    async function handleSignOut(){
        await signOut();
    }

    // Atualizar nome de perfil
    async function updateProfile(){
        if(nome === ''){
            return;
        }

        await firestore().collection('users')
        .doc(user?.uid)
        .update({
            nome: nome
        })

        const postDocs = await firestore().collection('posts')
        .where('userId', '==', user?.uid).get();

        postDocs.forEach( async doc => {
            await firestore().collection('posts').doc(doc.id)
            .update({
                autor: nome
            })
        })

        let data = {
            id: user?.uid,
            nome: nome,
            email: user?.email
        }

        setUser(data);
        storageUser(data);
        setOpen(false);
    }   

    return(
        <Container>
            <Header/>

            {url ? (
                <UploadButton onPress={() => alert('clicou 1')}>
                    <UploadText>+</UploadText>
                    <Avatar
                    source={{uri: url}}
                    />
                </UploadButton>
            ) : (
                <UploadButton onPress={() => alert('clicou 2')}>
                    <UploadText>+</UploadText>
                </UploadButton>
            )}

            <Name>{user?.nome}</Name>
            <Email>{user?.email}</Email>

            <Button bg="#428cfd" onPress={() => setOpen(true)}>
                <ButtonText color="#fff">Atualizar perfil</ButtonText>
            </Button>

            <Button bg="#ddd" onPress={handleSignOut}>
                <ButtonText color="#353840">Sair</ButtonText>
            </Button>

            <Modal visible={open} animationType="slide" transparent={true}>
                <ModalContainer behavior={Platform.OS === 'android' ? '' : 'padding' }>
                    <ButtonBack onPress={() => setOpen(false)}>
                        <Feather
                        name="arrow-left"
                        size={22}
                        color="#121212"
                        />
                        <ButtonText color="#121212">Voltar</ButtonText>
                    </ButtonBack>
                    <Input
                    placeholder={user?.nome}
                    value={nome}
                    onChangeText={(text) => setNome(text)}
                    />
                    <Button bg="#428cfd" onPress={updateProfile}>
                        <ButtonText color="#353840">Salvar</ButtonText>
                    </Button>
                </ModalContainer>
            </Modal>
        </Container>
    )
}

export default Profile;