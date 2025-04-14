import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from '@/components/ui/Avatar';
import { theme } from '@/constants/colors';
import { formatDistanceToNow } from '@/utils/date-utils';

interface ActivityItemProps {
  type: string;
  message: string;
  timestamp: string;
  user?: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export const ActivityItem: React.FC<ActivityItemProps> = ({
  type,
  message,
  timestamp,
  user,
}) => {
  const getActivityIcon = () => {
    // You could return different icons based on activity type
    return (
      <Avatar 
        name={user?.name} 
        uri={user?.avatar} 
        size="small" 
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>{getActivityIcon()}</View>
      <View style={styles.content}>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.footer}>
          {user && <Text style={styles.userName}>{user.name}</Text>}
          <Text style={styles.timestamp}>
            {formatDistanceToNow(new Date(timestamp))}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: theme.spacing.sm,
  },
  iconContainer: {
    marginRight: theme.spacing.md,
  },
  content: {
    flex: 1,
  },
  message: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: 4,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontWeight: '500',
    marginRight: theme.spacing.sm,
  },
  timestamp: {
    fontSize: 12,
    color: theme.colors.textTertiary,
  },
});