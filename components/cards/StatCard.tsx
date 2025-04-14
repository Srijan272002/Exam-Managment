import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '@/components/ui/Card';
import { theme } from '@/constants/colors';

interface StatCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
  onPress?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  color = theme.colors.primary,
  onPress,
}) => {
  return (
    <Card onPress={onPress} style={styles.card}>
      <View style={styles.container}>
        {icon && (
          <View style={[styles.iconContainer, { backgroundColor: color + '15' }]}>
            {icon}
          </View>
        )}
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.value}>{value}</Text>
          {change && (
            <View style={styles.changeContainer}>
              <Text
                style={[
                  styles.changeText,
                  {
                    color: change.isPositive
                      ? theme.colors.success
                      : theme.colors.error,
                  },
                ]}
              >
                {change.isPositive ? '+' : ''}
                {change.value}%
              </Text>
            </View>
          )}
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 140,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.text,
  },
  changeContainer: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
  },
});