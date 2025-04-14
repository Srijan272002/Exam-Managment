import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AlertTriangle, Bell, MapPin } from 'lucide-react-native';
import { theme } from '@/constants/colors';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { formatDistanceToNow } from '@/utils/date-utils';

interface AlertItemProps {
  type: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: string;
  onPress?: () => void;
}

export const AlertItem: React.FC<AlertItemProps> = ({
  type,
  message,
  severity,
  timestamp,
  onPress,
}) => {
  const getAlertIcon = () => {
    switch (type) {
      case 'geofence_violation':
        return <MapPin size={20} color={theme.colors.error} />;
      default:
        return <AlertTriangle size={20} color={theme.colors.warning} />;
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>{getAlertIcon()}</View>
      <View style={styles.content}>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.footer}>
          <StatusBadge status={severity} size="small" />
          <Text style={styles.timestamp}>
            {formatDistanceToNow(new Date(timestamp))}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  iconContainer: {
    marginRight: theme.spacing.md,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  message: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timestamp: {
    fontSize: 12,
    color: theme.colors.textTertiary,
  },
});