import React, {useState, createContext, useEffect} from "react";
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({})

function AuthProvider({children}){

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loadingAuth, setLoadingAuth] = useState(false);

    async function signUp(email, password, name){
        setLoadingAuth(true)
        await Auth().createUserWithEmailAndPassword(email, password)
        .then( async (value) => {
            let uid = value.user.uid;

            await firestore().collection('users')
            .doc(uid).set({
                nome: name,
                email: email,
                createdAt: new Date(),
            })
            .then(() => {
                let data = {
                    uid: uid,
                    nome: name,
                    email: value.user.email
                }

                setUser(data)
                storageUser(data)
                setLoadingAuth(false)

            })
        })
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false)
        })
    }

    async function signIn(email, password){
        setLoadingAuth(true)
        await Auth().signInWithEmailAndPassword(email, password)
        .then( async (value) => {

            let uid = value.user.uid;
            const userProfile = await firestore().collection('users')
            .doc(uid).get();

            //console.log(userProfile.data().nome)
            let data = {
                uid: uid,
                nome: userProfile.data().nome,
                email: value.user.email
            }

            setUser(data)
            storageUser(data)
            setLoadingAuth(false)

        }) 
        .catch( (error) => {
            console.log(error)
            setLoadingAuth(false)
        })
    }

    async function signOut(){
        await Auth().signOut();
        await AsyncStorage.clear()  
        .then( ( ) => {
            setUser(null)
        })
    }

    async function storageUser(data){
        await AsyncStorage.setItem('@devapp', JSON.stringify(data))
    }

    useEffect( () => {
        async function loadingStorage(){
            const storaageUser = await AsyncStorage.getItem('@devapp');

            if(storaageUser){
                setUser(JSON.parse(storaageUser))
                setLoading(false)
            }

            setLoading(false)
        }

        loadingStorage()
    }, [])

    return(
        <AuthContext.Provider value={{signed: !!user, signUp, signIn, loadingAuth, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
