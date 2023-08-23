import React, {useState, useContext} from "react";
import { AuthContext } from "../../Context/Auth";
import { View, Text, Keyboard, ActivityIndicator } from 'react-native';
import { Container, Title, Input, Button, ButtonText, SignUpButton, SignUpText } from './styled';

function Login(){

    const [login, setLogin] = useState(false)
    const { signUp, signIn, loadingAuth } = useContext(AuthContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    function ToggleLogin(){
        setLogin(!login)
        setEmail("")
        setName("")
        setPassword("")
        Keyboard.dismiss()
    }

    async function handleSingIn(){
        if(email === "" || password === ""){
            console.log('Preencha todos os campos')
            return;
        }

        await signIn(email, password)

    }

    async function handleSingUp(){
        if(name === "" || email === "" || password === ""){
            console.log('Preencha todos os campos')
            return;
        }    

        await signUp(email, password, name)

    }

    if(login){
        return(
            <Container>
                <Title>
                    Dev
                    <Text style={{color: '#e52246'}}>Post</Text>
                </Title>
    
                <Input
                placeholder="Seu nome"
                value={name}
                onChangeText={ (text) => setName(text)}
                />

                <Input
                placeholder="SeuEmail@email.com"
                value={email}
                onChangeText={ (text) => setEmail(text)}
                />
    
                <Input
                placeholder="********"
                value={password}
                onChangeText={ (text) => setPassword(text)}
                />
    
                <Button onPress={handleSingUp}>
                    {loadingAuth ? (
                        <ActivityIndicator size={20} color="#ddd"/>
                    ) : (
                        <ButtonText>Cadastrar</ButtonText>
                    )}
                </Button>
    
                <SignUpButton onPress={ToggleLogin}>
                    <SignUpText>Já possuo uma conta</SignUpText>
                </SignUpButton>
            </Container>
        )
    }

    return(
        <Container>
            <Title>
                Dev
                <Text style={{color: '#e52246'}}>Post</Text>
            </Title>

            <Input
            placeholder="SeuEmail@email.com"
            value={email}
            onChangeText={ (text) => setEmail(text)}
            />

            <Input
            placeholder="********"
            value={password}
            onChangeText={ (text) => setPassword(text)}
            />

            <Button onPress={handleSingIn}>
                {loadingAuth ? (
                    <ActivityIndicator size={20} color="#ddd"/>
                ) : (
                    <ButtonText>Acessar</ButtonText>
                )}
            </Button>

            <SignUpButton onPress={ToggleLogin}>
                <SignUpText>Criar uma conta</SignUpText>
            </SignUpButton>
            
        </Container>
    )
}

export default Login;