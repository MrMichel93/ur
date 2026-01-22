import React from 'react';
import { ActivityIndicator, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'secondary' | 'outline';
    loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ title, variant = 'primary', loading, className, ...props }) => {
    let baseStyle: ViewStyle = {
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 56,
    };
    
    let textStyle: TextStyle = {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    };

    if (variant === 'primary') {
        baseStyle = {
            ...baseStyle,
            backgroundColor: '#1e40af', // player-light (deep blue)
            shadowColor: '#1e40af',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.4,
            shadowRadius: 10,
            elevation: 10,
        };
        textStyle = { ...textStyle, color: '#ffffff' };
    } else if (variant === 'secondary') {
        baseStyle = {
            ...baseStyle,
            backgroundColor: '#f59e0b', // royal-gold
            shadowColor: '#f59e0b',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
            elevation: 8,
        };
        textStyle = { ...textStyle, color: '#1e293b' }; // mesopotamia-dusk
    } else if (variant === 'outline') {
        baseStyle = {
            ...baseStyle,
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderColor: '#1e40af', // player-light
        };
        textStyle = { ...textStyle, color: '#1e40af' };
    }

    if (props.disabled) {
        baseStyle = {
            ...baseStyle,
            backgroundColor: '#6b7280', // gray-500
            opacity: 0.5,
            shadowOpacity: 0,
            elevation: 0,
        };
        textStyle = { ...textStyle, color: '#d1d5db' }; // gray-300
    }

    return (
        <TouchableOpacity 
            style={[baseStyle, { opacity: props.disabled ? 0.5 : 1 }]} 
            disabled={loading || props.disabled} 
            activeOpacity={0.8}
            {...props}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'primary' ? 'white' : '#1e3a8a'} />
            ) : (
                <Text style={textStyle}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};
