import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Mail, Phone, MapPin } from 'lucide-react-native';
import { theme } from '@/constants/colors';
import { Avatar } from '@/components/ui/Avatar';
import { StatusBadge } from '@/components/ui/StatusBadge';

interface UserCardProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  location: string;
  avatar?: string;
  onPress?: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({
  id,
  name,
  email,
  phone,
  role,
  status,
  location,
  avatar,
  onPress,
}) => {
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'proctor':
        return 'Proctor';
      case 'center_manager':
        return 'Center Manager';
      default:
        return role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Avatar uri={avatar} name={name} size="medium" />
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.role}>{getRoleLabel(role)}</Text>
        </View>
        <StatusBadge status={status as any} />
      </View>
      
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Mail size={16} color={theme.colors.textSecondary} />
          <Text style={styles.infoText}>{email}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Phone size={16} color={theme.colors.textSecondary} />
          <Text style={styles.infoText}>{phone}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <MapPin size={16} color={theme.colors.textSecondary} />
          <Text style={styles.infoText}>{location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  headerInfo: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  role: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  infoContainer: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
    paddingTop: theme.spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  infoText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.sm,
  },
});