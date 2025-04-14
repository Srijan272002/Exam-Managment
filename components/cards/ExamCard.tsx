import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, Users, MapPin } from 'lucide-react-native';
import { theme } from '@/constants/colors';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { formatDate } from '@/utils/date-utils';

interface ExamCardProps {
  id: string;
  title: string;
  date: string;
  centers: number;
  staff: number;
  status: string;
  completion?: number;
  onPress?: () => void;
}

export const ExamCard: React.FC<ExamCardProps> = ({
  id,
  title,
  date,
  centers,
  staff,
  status,
  completion,
  onPress,
}) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <StatusBadge status={status as any} />
      </View>
      
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Calendar size={16} color={theme.colors.textSecondary} />
          <Text style={styles.infoText}>{formatDate(new Date(date))}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <MapPin size={16} color={theme.colors.textSecondary} />
          <Text style={styles.infoText}>{centers} centers</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Users size={16} color={theme.colors.textSecondary} />
          <Text style={styles.infoText}>{staff} staff</Text>
        </View>
      </View>
      
      {completion !== undefined && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${completion}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>{completion}% complete</Text>
        </View>
      )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  infoContainer: {
    marginBottom: theme.spacing.md,
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
  progressContainer: {
    marginTop: theme.spacing.xs,
  },
  progressBar: {
    height: 6,
    backgroundColor: theme.colors.divider,
    borderRadius: 3,
    marginBottom: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: theme.colors.textTertiary,
    textAlign: 'right',
  },
});
