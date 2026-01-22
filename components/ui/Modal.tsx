import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Modal as RNModal, Text, View, StyleSheet } from 'react-native';
import { Button } from './Button';

interface ModalProps {
    visible: boolean;
    title: string;
    message: string;
    actionLabel: string;
    onAction: () => void;
}

export const Modal: React.FC<ModalProps> = ({ visible, title, message, actionLabel, onAction }) => {
    return (
        <RNModal transparent visible={visible} animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <LinearGradient
                        colors={['#1a1f35', '#2d1b4e', '#1a1f35']}
                        style={styles.modalGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        {/* Decorative stars */}
                        <View style={styles.starField}>
                            {[...Array(20)].map((_, i) => (
                                <View
                                    key={i}
                                    style={[
                                        styles.star,
                                        {
                                            top: `${Math.random() * 100}%`,
                                            left: `${Math.random() * 100}%`,
                                            opacity: 0.3 + Math.random() * 0.5,
                                        }
                                    ]}
                                />
                            ))}
                        </View>

                        {/* Content */}
                        <Text style={styles.title}>{title}</Text>
                        <View style={styles.divider} />
                        <Text style={styles.message}>{message}</Text>
                        
                        <View style={styles.buttonContainer}>
                            <Button title={actionLabel} onPress={onAction} variant="primary" />
                        </View>
                    </LinearGradient>
                </View>
            </View>
        </RNModal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    modalContainer: {
        width: '100%',
        maxWidth: 400,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'rgba(255, 216, 155, 0.4)',
        shadowColor: '#ffd89b',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.6,
        shadowRadius: 20,
        elevation: 20,
    },
    modalGradient: {
        padding: 32,
        alignItems: 'center',
    },
    starField: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    star: {
        position: 'absolute',
        width: 2,
        height: 2,
        backgroundColor: '#e8d5b7',
        borderRadius: 1,
    },
    title: {
        fontSize: 28,
        fontFamily: 'Cinzel_700Bold',
        color: '#ffd89b',
        textAlign: 'center',
        letterSpacing: 2,
        marginBottom: 16,
        textShadowColor: 'rgba(255, 216, 155, 0.8)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 15,
        zIndex: 10,
    },
    divider: {
        width: 100,
        height: 2,
        backgroundColor: '#667eea',
        marginBottom: 20,
        opacity: 0.6,
        zIndex: 10,
    },
    message: {
        fontSize: 16,
        fontFamily: 'Quicksand_400Regular',
        color: '#c9d1d9',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 32,
        zIndex: 10,
    },
    buttonContainer: {
        width: '100%',
        zIndex: 10,
    },
});
