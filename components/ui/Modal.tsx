import React from 'react';
import { Modal as RNModal, Text, View } from 'react-native';
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
            <View style={{ 
                flex: 1, 
                backgroundColor: 'rgba(0, 0, 0, 0.75)', 
                alignItems: 'center', 
                justifyContent: 'center', 
                padding: 16 
            }}>
                <View style={{
                    backgroundColor: '#fef3c7', // desert-sand
                    padding: 32,
                    borderRadius: 24,
                    width: '100%',
                    maxWidth: 400,
                    borderWidth: 3,
                    borderColor: '#f59e0b', // royal-gold
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 20 },
                    shadowOpacity: 0.6,
                    shadowRadius: 30,
                    elevation: 25,
                }}>
                    {/* Decorative top element */}
                    <View style={{
                        width: 60,
                        height: 4,
                        backgroundColor: '#f59e0b',
                        borderRadius: 2,
                        marginBottom: 16,
                    }} />
                    
                    <Text style={{
                        fontSize: 32,
                        fontWeight: 'bold',
                        color: '#1e40af', // player-light
                        marginBottom: 12,
                        textAlign: 'center',
                        letterSpacing: 1.5,
                        textTransform: 'uppercase',
                    }}>
                        {title}
                    </Text>
                    
                    <Text style={{
                        fontSize: 16,
                        color: '#57534e', // stone-600
                        textAlign: 'center',
                        marginBottom: 24,
                        lineHeight: 24,
                    }}>
                        {message}
                    </Text>

                    <Button title={actionLabel} onPress={onAction} />
                </View>
            </View>
        </RNModal>
    );
};
