import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Button } from 'react-native';
import * as ImagePicker from 'react-native-image-picker'; 
import supabase from '../supabase';

const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        first_name: '',
        last_name: '',
        bio: '',
        location: '',
        profile_picture: ''
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        const userId = 'seu-user-id'; // Substitua pelo ID do usuário atual
        const { data, error } = await supabase
            .from('profile')
            .select('*')
            .eq('user_id', userId)
            .single();

        if (error) {
            console.error(error);
        } else {
            setProfile(data);
        }
    };

    const updateProfile = async () => {
        const userId = 'seu-user-id'; // Substitua pelo ID do usuário atual
        const { error } = await supabase
            .from('profile')
            .update(profile)
            .eq('user_id', userId);

        if (error) {
            console.error(error);
        } else {
            setIsEditing(false);
        }
    };

    const handleChange = (name: string, value: string) => {
        setProfile({ ...profile, [name]: value });
    };

    const handleImageUpload = async () => {
        const result = await ImagePicker.launchImageLibrary({
            mediaType: 'photo',
            quality: 1,
        });

        if (!result.didCancel && result.assets && result.assets.length > 0) {
            const file = result.assets[0];
            const path = `profile_pictures/${profile.user_id}/${file.fileName}`;

            const { data, error } = await supabase.storage
                .from('fotos')
                .upload(path, {
                    uri: file.uri,
                    type: file.type,
                    name: file.fileName,
                });

            if (error) {
                console.error(error);
            } else {
                const { publicUrl } = supabase.storage
                    .from('fotos')
                    .getPublicUrl(path);

                setProfile({ ...profile, profile_picture: publicUrl });
            }
        }
    };

    return (
        <View style={styles.container}>
            <Image style={styles.profileImage} source={{ uri: profile.profile_picture }} />
            {isEditing ? (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        value={profile.first_name}
                        onChangeText={(text) => handleChange('first_name', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        value={profile.last_name}
                        onChangeText={(text) => handleChange('last_name', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Bio"
                        value={profile.bio}
                        onChangeText={(text) => handleChange('bio', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Location"
                        value={profile.location}
                        onChangeText={(text) => handleChange('location', text)}
                    />
                    <Button title="Upload Image" onPress={handleImageUpload} />
                </>
            ) : (
                <>
                    <Text style={styles.username}>{profile.first_name} {profile.last_name}</Text>
                    <Text style={styles.bio}>{profile.bio}</Text>
                    <Text style={styles.location}>{profile.location}</Text>
                </>
            )}
            <View style={styles.statsContainer}>
                <Text style={styles.stats}>Seguindo: 5666</Text>
                <Text style={styles.stats}>Seguidores: 2</Text>
            </View>
            <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.editButton} onPress={() => { isEditing ? updateProfile() : setIsEditing(true); }}>
                    <Text style={styles.editButtonText}>{isEditing ? 'Salvar' : 'Editar Perfil'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsButton}>
                    <Text style={styles.settingsButtonText}>Configurações</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 2,
        borderColor: '#ff6a06',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: '80%',
        borderRadius: 5,
    },
    username: {
        fontSize: 24,
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    bio: {
        textAlign: 'center',
        color: 'black',
        marginBottom: 20,
    },
    location: {
        textAlign: 'center',
        color: 'black',
        marginBottom: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    stats: {
        color: 'black',
        marginRight: 20,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    editButton: {
        backgroundColor: '#ff6a06',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginRight: 10,
    },
    editButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    settingsButton: {
        backgroundColor: '#ff6a06',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    settingsButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default UserProfile;
