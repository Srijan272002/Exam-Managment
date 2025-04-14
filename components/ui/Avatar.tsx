import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { theme } from '@/constants/colors';

type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';

interface AvatarProps {
  uri?: string;
  name?: string;
  size?: AvatarSize;
  backgroundColor?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  uri,
  name,
  size = 'medium',
  backgroundColor,
}) => {
  const getInitials = (name: string) => {
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return {
          container: { width: 32, height: 32 },
          text: { fontSize: 12 },
        };
      case 'large':
        return {
          container: { width: 56, height: 56 },
          text: { fontSize: 20 },
        };
      case 'xlarge':
        return {
          container: { width: 72, height: 72 },
          text: { fontSize: 24 },
        };
      default:
        return {
          container: { width: 40, height: 40 },
          text: { fontSize: 16 },
        };
    }
  };

  const sizeStyle = getSizeStyle();
  const bgColor = backgroundColor || theme.colors.primary;

  return (
    <View
      style={[
        styles.container,
        sizeStyle.container,
        { backgroundColor: uri ? 'transparent' : bgColor },
      ]}
    >
      {uri ? (
        <Image source={{ uri }} style={styles.image} />
      ) : name ? (
        <Text style={[styles.text, sizeStyle.text]}>{getInitials(name)}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: 'white',
    fontWeight: '600',
  },
});