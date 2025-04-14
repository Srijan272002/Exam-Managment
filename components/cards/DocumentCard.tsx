import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FileText, Check, X, Clock } from 'lucide-react-native';
import { theme } from '@/constants/colors';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { formatDistanceToNow } from '@/utils/date-utils';

interface DocumentCardProps {
  id: string;
  type: string;
  title: string;
  submittedBy: {
    id: string;
    name: string;
  };
  submittedAt: string;
  status: string;
  url?: string;
  onPress?: () => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  id,
  type,
  title,
  submittedBy,
  submittedAt,
  status,
  url,
  onPress,
}) => {
  const getDocumentTypeLabel = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'approved':
        return <Check size={18} color={theme.colors.success} />;
      case 'rejected':
        return <X size={18} color={theme.colors.error} />;
      default:
        return <Clock size={18} color={theme.colors.warning} />;
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <FileText size={24} color={theme.colors.primary} />
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.type}>{getDocumentTypeLabel(type)}</Text>
        </View>
        <StatusBadge status={status as any} />
      </View>
      
      {url && (
        <View style={styles.previewContainer}>
          <Image 
            source={{ uri: url }} 
            style={styles.previewImage}
            resizeMode="cover"
          />
        </View>
      )}
      
      <View style={styles.footer}>
        <View style={styles.submittedInfo}>
          <Text style={styles.submittedBy}>
            Submitted by {submittedBy.name}
          </Text>
          <Text style={styles.submittedAt}>
            {formatDistanceToNow(new Date(submittedAt))} ago
          </Text>
        </View>
        <View style={styles.statusIcon}>
          {getStatusIcon()}
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
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  headerInfo: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  type: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  previewContainer: {
    height: 120,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
    paddingTop: theme.spacing.md,
  },
  submittedInfo: {
    flex: 1,
  },
  submittedBy: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  submittedAt: {
    fontSize: 12,
    color: theme.colors.textTertiary,
    marginTop: 2,
  },
  statusIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});