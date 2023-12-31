import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import apiEndpoints from '../service/api'

import { View, Text, Image, StyleSheet } from 'react-native';
import Colors, { containerStyle } from '../constants/colors';

const StudentProfile = () => {

    const [profileData, setProfileData] = useState()

    useEffect(() => {
        handelProfile();
    }, []);
    
    const handelProfile = async () => {
        try {
            const userToken = await SecureStore.getItemAsync('authToken')
            
            if (userToken) {
                const response = await apiEndpoints.student.getProfile(userToken);

                setProfileData(response.data);
            } else {
                alert("Something went wrong")
            }
        } catch (error) {
            alert("Something went wrong !! try again later")
        }
    }
    
    const studentData = {
        img: 'https://avatars.githubusercontent.com/u/56132780?v=4',
        name: profileData?.name,
        section: profileData?.section,
        email: profileData?.email,
        branch: profileData?.branch,
        batch: profileData?.batch,
    };

    return (
        <View style={styles.card}>
            {/* <Image source={{
                uri: `${studentData.img}`,
            }} style={styles.profileImage} /> */}
            <View style={{ backgroundColor: Colors.accent, height: 100, width: 1 }} />
            <View style={styles.content}>
                <Text style={styles.text}>Name : {studentData.name}</Text>
                <Text style={styles.text}>Section : {studentData.section}</Text>
                <Text style={styles.text}>Email : {studentData.email}</Text>
                <Text style={styles.text}>Branch :{studentData.branch}</Text>
                <Text style={styles.text}>Batch : {studentData.batch}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderRadius: 8,
        padding: 15,
        margin: 20,
        alignItems: 'center',
        elevation: 5,
        gap: 10,
        width: "100%",
        shadowColor: Colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    text: {
        color: Colors.text,
        fontSize: 16,
        marginBottom: 5,
        textAlign: "left"
    },
});

export default StudentProfile;
