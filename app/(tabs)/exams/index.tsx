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
  PlusCircle,
  Filter,
  Calendar
} from 'lucide-react-native';
import { theme } from '@/constants/colors';
import { SearchBar } from '@/components/ui/SearchBar';
import { Button } from '@/components/ui/Button';
import { ExamCard } from '@/components/cards/ExamCard';
import { exams } from '@/mocks/exams';

export default function ExamsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // In a real app, you would fetch fresh data here
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'upcoming') {
      return matchesSearch && ['preparation', 'staff_assignment'].includes(exam.status);
    }
    if (activeFilter === 'in_progress') {
      return matchesSearch && ['in_progress', 'installation'].includes(exam.status);
    }
    if (activeFilter === 'completed') {
      return matchesSearch && exam.status === 'completed';
    }
    
    return matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <View style={styles.header}>
        <Text style={styles.title}>Exam Management</Text>
        <Text style={styles.subtitle}>Create and manage examination events</Text>
      </View>

      <View style={styles.searchContainer}>
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search exams by title"
        />
      </View>

      <View style={styles.actionsContainer}>
        <Button 
          title="Create Exam" 
          onPress={() => {}} 
          icon={<PlusCircle size={16} color="#fff" />}
          size="small"
        />
        <Button 
          title="Filter" 
          onPress={() => {}} 
          variant="outline"
          icon={<Filter size={16} color={theme.colors.primary} />}
          size="small"
        />
        <Button 
          title="Calendar" 
          onPress={() => {}} 
          variant="outline"
          icon={<Calendar size={16} color={theme.colors.primary} />}
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
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterTab,
            activeFilter === 'upcoming' && styles.activeFilterTab,
          ]}
          onPress={() => setActiveFilter('upcoming')}
        >
          <Text
            style={[
              styles.filterTabText,
              activeFilter === 'upcoming' && styles.activeFilterTabText,
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterTab,
            activeFilter === 'in_progress' && styles.activeFilterTab,
          ]}
          onPress={() => setActiveFilter('in_progress')}
        >
          <Text
            style={[
              styles.filterTabText,
              activeFilter === 'in_progress' && styles.activeFilterTabText,
            ]}
          >
            In Progress
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterTab,
            activeFilter === 'completed' && styles.activeFilterTab,
          ]}
          onPress={() => setActiveFilter('completed')}
        >
          <Text
            style={[
              styles.filterTabText,
              activeFilter === 'completed' && styles.activeFilterTabText,
            ]}
          >
            Completed
          </Text>
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
        <View style={styles.examsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {filteredExams.length} {filteredExams.length === 1 ? 'Exam' : 'Exams'}
            </Text>
            <TouchableOpacity>
              <Text style={styles.sortText}>Sort by: Date</Text>
            </TouchableOpacity>
          </View>

          {filteredExams.map(exam => (
            <ExamCard
              key={exam.id}
              id={exam.id}
              title={exam.title}
              date={exam.date}
              centers={exam.totalCenters}
              staff={exam.totalStaff}
              status={exam.status}
              completion={exam.completion}
              onPress={() => {}}
            />
          ))}

          {filteredExams.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No exams found matching your criteria
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
  },
  activeFilterTabText: {
    color: '#fff',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },
  examsContainer: {
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