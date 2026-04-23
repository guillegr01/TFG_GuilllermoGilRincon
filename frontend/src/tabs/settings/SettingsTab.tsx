import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Expo ya lo incluye por defecto
import { useUser } from '@/src/hooks/useUser';

const { width } = Dimensions.get('window');

export default function SettingsTab({ navigation }: any) {
    
    const { user, loading } = useUser("699c9b32d5e6e90cb3b09cf1");

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9FAFB' }}>
                <ActivityIndicator size="large" color="#10b981" />
            </View>
        );
    }

    if(!user) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Cannot load user information</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            
            {/* Header / user information */}
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <Ionicons name="person" size={80} color="#9CA3AF" />
                </View>
                <Text style={styles.userName}>{user.name} {user.surname}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
            </View>

            {/* Diabetes information */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Medical Information</Text>
                <View style={styles.infoCard}>
                    <View style={styles.infoRow}>
                        <Ionicons name="medkit-outline" size={22} color="#10b981" />
                        <Text style={styles.infoLabel}>Diabetes</Text>
                        <Text style={styles.infoValue}>{user.diabetesType === "tipo 1" ? "Tipo 1" : "Tipo 2"}</Text>
                    </View>
                </View>
            </View>

            {/* Therapy configuration */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account Settings</Text>
                
                <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => navigation.navigate('TherapyInfo', { userId: user.id })} 
                >
                    <View style={styles.actionLeft}>
                        <Ionicons name="options-outline" size={24} color="#374151" />
                        <Text style={styles.actionText}>My Therapy</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </TouchableOpacity>

                <View style={styles.infoCardMinimal}>
                    <Text style={styles.minimalText}>
                        Register Date: {new Date(user.registerDate).toLocaleDateString()}
                    </Text>
                </View>
            </View>

            {/*App information*/}
            <View style={styles.footer}>
                <Text style={styles.versionText}>Glucocheck App</Text>
                <Text style={styles.versionNumber}>Version 1.0.0 - stable</Text>
                <Text style={styles.footerDetail}>© 2026 TFG - Universidad Antonio Nebrija</Text>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB', 
    },
    header: {
        alignItems: 'center',
        paddingVertical: 40,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    avatarContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 2,
        borderColor: '#E5E7EB',
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111827',
    },
    userEmail: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 4,
    },
    section: {
        marginTop: 25,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6B7280',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 10,
        marginLeft: 5,
    },
    infoCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoLabel: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#374151',
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#10b981',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 12,
        marginBottom: 10,
        elevation: 2,
    },
    actionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionText: {
        marginLeft: 12,
        fontSize: 16,
        fontWeight: '500',
        color: '#374151',
    },
    footer: {
        marginTop: 40,
        alignItems: 'center',
        paddingBottom: 20,
    },
    versionText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#9CA3AF',
    },
    versionNumber: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    footerDetail: {
        fontSize: 10,
        color: '#D1D5DB',
        marginTop: 10,
    },
    infoCardMinimal: {
        marginTop: 10, 
        alignItems: 'center' 
    },
    minimalText: { 
        fontSize: 12, 
        color: '#9CA3AF' 
    }
});