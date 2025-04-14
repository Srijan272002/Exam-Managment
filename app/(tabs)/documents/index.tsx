import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Filter,
  CheckSquare,
  XSquare
} from 'lucide-react-native';
import { theme } from '@/constants/colors';
import { SearchBar } from '@/components/ui/SearchBar';
import { Button } from '@/components/ui/Button';
import { DocumentCard } from '@/components/cards/DocumentCard';
import { documents } from '@/mocks/documents';

export default function DocumentsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('pending');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // In a real app, you would fetch fresh data here
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.submittedBy.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    return matchesSearch && doc.status === activeFilter;
  });

  const pendingCount = documents.filter(doc => doc.status === 'pending').length;
  const approvedCount = documents.filter(doc => doc.status === 'approved').length;
  const rejectedCount = documents.filter(doc => doc.status === 'rejected').length;

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <View style={styles.header}>
        <Text style={styles.title}>Document Management</Text>
        <Text style={styles.subtitle}>Review and manage submitted documents</Text>
      </View>

      <View style={styles.searchContainer}>
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search documents by title or type"
        />
      </View>

      <View style={styles.actionsContainer}>
        <Button 
          title="Filter" 
          onPress={() => {}} 
          variant="outline"
          icon={<Filter size={16} color={theme.colors.primary} />}
          size="small"
        />
        <Button 
          title="Batch Approve" 
          onPress={() => {}} 
          variant="outline"
          icon={<CheckSquare size={16} color={theme.colors.primary} />}
          size="small"
        />
        <Button 
          title="Batch Reject" 
          onPress={() => {}} 
          variant="outline"
          icon={<XSquare size={16} color={theme.colors.primary} />}
          size="small"
        />
      </View>

      <View style={styles.filterTabs}>
        <TouchableOpacity
          style={[
            styles.filterTab,
            activeFilter === 'all' && styles.activeFilterTab,
          ]}
          onPress={() => setActiveFilter('all')}
        >
          <Text
            style={[
              styles.filterTabText,
              activeFilter === 'all' && styles.activeFilterTabText,
            ]}
          >
            All
          </Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{documents.length}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterTab,
            activeFilter === 'pending' && styles.activeFilterTab,
          ]}
          onPress={() => setActiveFilter('pending')}
        >
          <Text
            style={[
              styles.filterTabText,
              activeFilter === 'pending' && styles.activeFilterTabText,
            ]}
          >
            Pending
          </Text>
          <View style={[styles.countBadge, styles.pendingBadge]}>
            <Text style={styles.countText}>{pendingCount}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterTab,
            activeFilter === 'approved' && styles.activeFilterTab,
          ]}
          onPress={() => setActiveFilter('approved')}
        >
          <Text
            style={[
              styles.filterTabText,
              activeFilter === 'approved' && styles.activeFilterTabText,
            ]}
          >
            Approved
          </Text>
          <View style={[styles.countBadge, styles.approvedBadge]}>
            <Text style={styles.countText}>{approvedCount}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterTab,
            activeFilter === 'rejected' && styles.activeFilterTab,
          ]}
          onPress={() => setActiveFilter('rejected')}
        >
          <Text
            style={[
              styles.filterTabText,
              activeFilter === 'rejected' && styles.activeFilterTabText,
            ]}
          >
            Rejected
          </Text>
          <View style={[styles.countBadge, styles.rejectedBadge]}>
            <Text style={styles.countText}>{rejectedCount}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.documentsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {filteredDocuments.length} {filteredDocuments.length === 1 ? 'Document' : 'Documents'}
            </Text>
            <TouchableOpacity>
              <Text style={styles.sortText}>Sort by: Recent</Text>
            </TouchableOpacity>
          </View>

          {filteredDocuments.map(doc => (
            <DocumentCard
              key={doc.id}
              id={doc.id}
              type={doc.type}
              title={doc.title}
              submittedBy={doc.submittedBy}
              submittedAt={doc.submittedAt}
              status={doc.status}
              url={doc.url}
              onPress={() => {}}
            />
          ))}

          {filteredDocuments.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No documents found matching your criteria
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  filterTabs: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    marginRight: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  activeFilterTab: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterTabText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginRight: theme.spacing.xs,
  },
  activeFilterTabText: {
    color: '#fff',
    fontWeight: '500',
  },
  countBadge: {
    backgroundColor: theme.colors.textTertiary,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  pendingBadge: {
    backgroundColor: theme.colors.warning,
  },
  approvedBadge: {
    backgroundColor: theme.colors.success,
  },
  rejectedBadge: {
    backgroundColor: theme.colors.error,
  },
  countText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },
  documentsContainer: {
    paddingHorizontal: theme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  sortText: {
    fontSize: 14,
    color: theme.colors.primary,
  },
  emptyState: {
    padding: theme.spacing.xl,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});