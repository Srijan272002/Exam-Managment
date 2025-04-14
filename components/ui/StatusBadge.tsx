import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/colors';

type StatusType = 
  | 'active' 
  | 'inactive' 
  | 'pending' 
  | 'approved' 
  | 'rejected'
  | 'in_progress'
  | 'completed'
  | 'preparation'
  | 'installation'
  | 'staff_assignment'
  | 'high'
  | 'medium'
  | 'low';

interface StatusBadgeProps {
  status: StatusType;
  size?: 'small' | 'medium' | 'large';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  size = 'medium' 
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'active':
      case 'approved':
      case 'completed':
        return theme.colors.success;
      case 'inactive':
      case 'rejected':
        return theme.colors.error;
      case 'pending':
      case 'preparation':
      case 'installation':
      case 'staff_assignment':
        return theme.colors.warning;
      case 'in_progress':
        return theme.colors.primary;
      case 'high':
        return theme.colors.error;
      case 'medium':
        return theme.colors.warning;
      case 'low':
        return theme.colors.info;
      default:
        return theme.colors.textTertiary;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'inactive':
        return 'Inactive';
      case 'pending':
        return 'Pending';
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'preparation':
        return 'Preparation';
      case 'installation':
        return 'Installation';
      case 'staff_assignment':
        return 'Staff Assignment';
      case 'high':
        return 'High';
      case 'medium':
        return 'Medium';
      case 'low':
        return 'Low';
      default:
        return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          container: { paddingVertical: 2, paddingHorizontal: 6 },
          text: { fontSize: 10 }
        };
      case 'large':
        return {
          container: { paddingVertical: 6, paddingHorizontal: 12 },
          text: { fontSize: 14 }
        };
      default:
        return {
          container: { paddingVertical: 4, paddingHorizontal: 8 },
          text: { fontSize: 12 }
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const backgroundColor = getStatusColor();
  const statusText = getStatusText();

  return (
    <View style={[
      styles.container, 
      { backgroundColor: backgroundColor + '20' },
      sizeStyles.container
    ]}>
      <Text style={[
        styles.text, 
        { color: backgroundColor },
        sizeStyles.text
      ]}>
        {statusText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.round,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '600',
  },
});