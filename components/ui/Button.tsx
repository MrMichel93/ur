import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'secondary' | 'outline';
    loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ title, variant = 'primary', loading, className, ...props }) => {
    const isDisabled = loading || props.disabled;

    if (variant === 'primary') {
        return (
            <TouchableOpacity 
                style={[styles.button, isDisabled && styles.disabled]}
                disabled={isDisabled} 
                activeOpacity={0.8}
                {...props}
            >
                <LinearGradient
                    colors={['#f6b93b', '#c79100', '#e5b800']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradient}
                >
                    {loading ? (
                        <ActivityIndicator color="#0a0e1a" />
                    ) : (
                        <Text style={styles.primaryText}>{title}</Text>
                    )}
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    if (variant === 'secondary') {
        return (
            <TouchableOpacity 
                style={[styles.button, styles.secondaryButton, isDisabled && styles.disabled]}
                disabled={isDisabled}
                activeOpacity={0.8}
                {...props}
            >
                <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradient}
                >
                    {loading ? (
                        <ActivityIndicator color="#e8d5b7" />
                    ) : (
                        <Text style={styles.secondaryText}>{title}</Text>
                    )}
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    // Outline variant
    return (
        <TouchableOpacity 
            style={[styles.button, styles.outlineButton, isDisabled && styles.disabled]}
            disabled={isDisabled}
            activeOpacity={0.8}
            {...props}
        >
            {loading ? (
                <ActivityIndicator color="#e8d5b7" />
            ) : (
                <Text style={styles.outlineText}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '100%',
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#ffd89b',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    gradient: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 56,
    },
    secondaryButton: {
        shadowColor: '#667eea',
    },
    outlineButton: {
        borderWidth: 2,
        borderColor: '#e8d5b7',
        backgroundColor: 'transparent',
        shadowOpacity: 0,
    },
    disabled: {
        opacity: 0.5,
        shadowOpacity: 0,
    },
    primaryText: {
        fontSize: 18,
        fontFamily: 'Cinzel_700Bold',
        color: '#0a0e1a',
        textAlign: 'center',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    secondaryText: {
        fontSize: 18,
        fontFamily: 'Cinzel_700Bold',
        color: '#e8d5b7',
        textAlign: 'center',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    outlineText: {
        fontSize: 18,
        fontFamily: 'Cinzel_700Bold',
        color: '#e8d5b7',
        textAlign: 'center',
        letterSpacing: 1,
        textTransform: 'uppercase',
        paddingVertical: 16,
    },
});
