import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTherapy } from "../../hooks/useTherapy";
import { putClientApi } from '@/src/api/client';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TherapyTab({ route, navigation }: any) {
    const { userId } = route.params;
    const { therapy, loading, setTherapy } = useTherapy(userId);

    const [isEditing, setIsEditing] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    if (loading) return <ActivityIndicator size="large" style={{flex: 1}} color="#10b981" />;
    if (!therapy) return <Text>Therapy Not found</Text>;

    const handleSave = async () => {
        
        setIsUpdating(true);

        try {
            
            await putClientApi( "/therapy", {
                ratios: therapy.ratios,
                glucoseTarget: therapy.glucoseTarget,
                insulinActive: therapy.insulinActive,
                glucoseLimits: therapy.glucoseLimits
            }, therapy.id);

            Alert.alert("Success", "Therapy updated correctly");
            setIsEditing(false);
        } catch (error) {
            console.error(error);
            Alert.alert("Update Failed");
        } finally {
            setIsUpdating(false);
        }

    };

    const getPeriodColor = (period: any) => {
        switch (period) {
            case "desayuno":
                return "#F59E0B";
            case "comida":
                return "#10B981";
            case "merienda":
                return "#3B82F6";
            case "cena":
                return "#8B5CF6";
            default:
                return "#6B7280";
        }
    };

    return (

        <SafeAreaView style={styles.safeArea}>

            {/* Header */}
            <View style={styles.customHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#374151" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Therapy</Text>
                <TouchableOpacity onPress={() => isEditing ? handleSave() : setIsEditing(true)} disabled={isUpdating}>
                    <Text style={[styles.editBtn, isEditing && { color: '#10b981' }, isUpdating && { opacity: 0.5}]}>
                        {isUpdating ? "Saving..." : (isEditing ? "Save" : "Edit")}
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.container}>

                {/* Therapy info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Therapy Info</Text>
                    <View style={styles.card}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Glucose Target</Text>
                            {isEditing ? (
                                <TextInput 
                                    style={styles.input} 
                                    keyboardType="numeric"
                                    defaultValue={therapy.glucoseTarget.toString()}
                                    onChangeText={(val) => setTherapy({...therapy, glucoseTarget: Number(val)})}
                                />
                            ) : (
                                <Text style={styles.value}>{therapy.glucoseTarget} mg/dL</Text>
                            )}
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Insulin Active</Text>
                            {isEditing ? (
                                <TextInput
                                    style={styles.input} 
                                    keyboardType="numeric"
                                    defaultValue={therapy.insulinActive.toString()}
                                    onChangeText={(val) => setTherapy({...therapy, insulinActive: Number(val)})}
                                />
                            ) : (
                                <Text style={styles.value}>{therapy.insulinActive} h</Text>
                            )}
                        </View>
                    </View>
                </View>

                {/* Ratios */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Ratios and Sensibility Factor</Text>
                    <View style={styles.card}>
                        <View style={[styles.row, { borderBottomWidth: 1, borderBottomColor: '#F3F4F6', paddingBottom: 5 }]}>
                            <Text style={[styles.label, { flex: 2 }]}>Period</Text>
                            <Text style={[styles.label, { flex: 1, textAlign: 'center' }]}>Ratio</Text>
                            <Text style={[styles.label, { flex: 1, textAlign: 'center' }]}>Sensibility Factor</Text>
                        </View>
                        {therapy.ratios.map((elem: any, index: any) => (
                            <View key={index} style={styles.row}>
                                <Text style={[styles.periodText, { flex: 2, color: getPeriodColor(elem.period)}]}>{elem.period.toUpperCase()}</Text>
                                
                                {isEditing ? (
                                    <>
                                        <TextInput 
                                            style={[styles.input, { flex: 1, textAlign: 'center' }]}
                                            keyboardType="numeric"
                                            defaultValue={elem.ratio.toString()}
                                            onChangeText={(val) => {
                                                const newRatios = [...therapy.ratios];
                                                newRatios[index].ratio = Number(val);
                                                setTherapy({...therapy, ratios: newRatios});
                                            }}
                                        />
                                        <TextInput 
                                            style={[styles.input, { flex: 1, textAlign: 'center' }]}
                                            keyboardType="numeric"
                                            defaultValue={elem.sensibilityFactor.toString()}
                                            onChangeText={(val) => {
                                                const newRatios = [...therapy.ratios];
                                                newRatios[index].sensibilityFactor = Number(val);
                                                setTherapy({...therapy, ratios: newRatios});
                                            }}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Text style={[styles.value, { flex: 1, textAlign: 'center' }]}>{elem.ratio}</Text>
                                        <Text style={[styles.value, { flex: 1, textAlign: 'center' }]}>{elem.sensibilityFactor}</Text>
                                    </>
                                )}
                            </View>
                        ))}
                    </View>
                </View>

                {/* Range Limits */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Glucose Limits</Text>
                    <View style={styles.card}>
                        <View style={styles.row}>
                            <View style={[styles.dot, { backgroundColor: '#ef4444' }]} />
                            <Text style={styles.label}>Low Limit</Text>
                            {isEditing ? (
                                <TextInput
                                    style={styles.input} 
                                    keyboardType="numeric"
                                    defaultValue={therapy.glucoseLimits.lowLimit.toString()}
                                    onChangeText={(val) => setTherapy({...therapy, glucoseLimits: {...therapy.glucoseLimits, lowLimit: Number(val)}})}
                                />
                            ) : (
                                <Text style={styles.value}>{therapy.glucoseLimits.lowLimit} mg/dL</Text>
                            )}
                        </View>
                        <View style={styles.row}>
                            <View style={[styles.dot, { backgroundColor: '#10b981' }]} />
                            <Text style={styles.label}>In Range Limit</Text>
                            {isEditing ? (
                                <TextInput
                                    style={styles.input} 
                                    keyboardType="numeric"
                                    defaultValue={therapy.glucoseLimits.inRangeLimit.toString()}
                                    onChangeText={(val) => setTherapy({...therapy, glucoseLimits: {...therapy.glucoseLimits, inRangeLimit: Number(val)}})}
                                />
                            ) : (
                                <Text style={styles.value}>{therapy.glucoseLimits.inRangeLimit} mg/dL</Text>
                            )}
                        </View>
                        <View style={styles.row}>
                            <View style={[styles.dot, { backgroundColor: '#ffd900' }]} />
                            <Text style={styles.label}>High Limit</Text>
                            {isEditing ? (
                                <TextInput
                                    style={styles.input} 
                                    keyboardType="numeric"
                                    defaultValue={therapy.glucoseLimits.highLimit.toString()}
                                    onChangeText={(val) => setTherapy({...therapy, glucoseLimits: {...therapy.glucoseLimits, highLimit: Number(val)}})}
                                />
                            ) : (
                                <Text style={styles.value}>{therapy.glucoseLimits.highLimit} mg/dL</Text>
                            )}
                        </View>
                        <View style={styles.row}>
                            <View style={[styles.dot, { backgroundColor: '#fb923c' }]} />
                            <Text style={styles.label}>Very High Limit</Text>
                            {isEditing ? (
                                <TextInput
                                    style={styles.input} 
                                    keyboardType="numeric"
                                    defaultValue={therapy.glucoseLimits.veryHighLimit.toString()}
                                    onChangeText={(val) => setTherapy({...therapy, glucoseLimits: {...therapy.glucoseLimits, veryHighLimit: Number(val)}})}
                                />
                            ) : (
                                <Text style={styles.value}>{therapy.glucoseLimits.veryHighLimit} mg/dL</Text>
                            )}
                        </View>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    container: { 
        flex: 1, 
        backgroundColor: '#F9FAFB' 
    },
    customHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
        backgroundColor: '#FFF'
    },
    headerTitle: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        color: '#1F2937' 
    },
    editBtn: { 
        color: '#3B82F6', 
        fontWeight: 'bold', 
        fontSize: 16 
    },
    section: { 
        marginTop: 20,
        paddingHorizontal: 20 
    },
    sectionTitle: {
        fontSize: 13, 
        fontWeight: '700', 
        color: '#6B7280', 
        textTransform: 'uppercase', 
        marginBottom: 8, 
        marginLeft: 4 
    },
    card: { 
        backgroundColor: '#FFF', 
        borderRadius: 15, 
        padding: 15, 
        elevation: 2, 
        shadowColor: '#000', 
        shadowOpacity: 0.05 
    },
    row: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingVertical: 10 
    },
    label: { 
        fontSize: 15, 
        color: '#4B5563', 
        flex: 1 
    },
    value: { 
        fontSize: 15, 
        fontWeight: '600', 
        color: '#111827' 
    },
    periodText: { 
        fontSize: 12, 
        fontWeight: 'bold', 
        color: '#9CA3AF' 
    },
    dot: { 
        width: 10,
        height: 10, 
        borderRadius: 5, 
        marginRight: 10 
    },
    input: { 
        borderBottomWidth: 1, 
        borderBottomColor: '#10b981', 
        padding: 2, 
        minWidth: 50, 
        textAlign: 'right', 
        color: '#10b981', 
        fontWeight: 'bold' 
    }
});