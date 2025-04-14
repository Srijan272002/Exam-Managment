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
  MapPin,
  Users,
  FileCheck,
  Clock,
  AlertTriangle
} from 'lucide-react-native';
import { theme } from '@/constants/colors';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ExamCard } from '@/components/cards/ExamCard';
import { exams } from '@/mocks/exams';
import { dashboardStats } from '@/mocks/stats';

export default function MonitoringScreen() {
  const [activeTab, setActiveTab] = useState('installation');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // In a real app, you would fetch fresh data here
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  // Filter exams based on the active tab
  const activeExams = exams.filter(exam => {
    if (activeTab === 'installation') {
      return exam.status === 'installation' || exam.status === 'preparation';
    }
    if (activeTab === 'exam_day') {
      return exam.status === 'in_progress';
    }
    if (activeTab === 'closure') {
      return exam.status === 'completed';
    }
    return false;
  });

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <View style={styles.header}>
        <Text style={styles.title}>Real-time Monitoring</Text>
        <Text style={styles.subtitle}>Monitor exam activities in real-time</Text>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'installation' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('installation')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'installation' && styles.activeTabText,
            ]}
          >
            Installation Day
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'exam_day' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('exam_day')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'exam_day' && styles.activeTabText,
            ]}
          >
            Exam Day
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'closure' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('closure')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'closure' && styles.activeTabText,
            ]}
          >
            Closure Day
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
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Users size={20} color={theme.colors.primary} />
            </View>
            <Text style={styles.statValue}>
              {activeTab === 'installation' ? '42/48' : activeTab === 'exam_day' ? '32/32' : '20/20'}
            </Text>
            <Text style={styles.statLabel}>Staff Check-ins</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <FileCheck size={20} color={theme.colors.success} />
            </View>
            <Text style={styles.statValue}>
              {activeTab === 'installation' ? '36/48' : activeTab === 'exam_day' ? '28/32' : '20/20'}
            </Text>
            <Text style={styles.statLabel}>Reports Submitted</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <AlertTriangle size={20} color={theme.colors.warning} />
            </View>
            <Text style={styles.statValue}>
              {activeTab === 'installation' ? '2' : activeTab === 'exam_day' ? '1' : '0'}
            </Text>
            <Text style={styles.statLabel}>Alerts</Text>
          </View>
        </View>

        <View style={styles.mapSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Staff Locations</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View Map</Text>
            </TouchableOpacity>
          </View>
          <Card>
            <View style={styles.mapPlaceholder}>
              <MapPin size={32} color={theme.colors.primary} />
              <Text style={styles.mapPlaceholderText}>
                Map view would be displayed here
              </Text>
              <Text style={styles.mapPlaceholderSubtext}>
                Showing staff locations with geofence boundaries
              </Text>
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {activeTab === 'installation' 
                ? 'Installation Progress' 
                : activeTab === 'exam_day' 
                  ? 'Exams in Progress' 
                  : 'Closure Activities'}
            </Text>
          </View>

          {activeExams.map(exam => (
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

          {activeExams.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No exams found for {activeTab.replace('_', ' ')}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Alerts</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {dashboardStats.alerts.map(alert => (
            <Card key={alert.id} style={styles.alertCard}>
              <View style={styles.alertHeader}>
                <View style={[
                  styles.alertIcon, 
                  { backgroundColor: alert.severity === 'high' 
                    ? theme.colors.error + '20' 
                    : theme.colors.warning + '20' 
                  }
                ]}>
                  <AlertTriangle 
                    size={20} 
                    color={alert.severity === 'high' 
                      ? theme.colors.error 
                      : theme.colors.warning
                    } 
                  />
                </View>
                <View style={styles.alertInfo}>
                  <Text style={styles.alertMessage}>{alert.message}</Text>
                  <Text style={styles.alertTime}>
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </Text>
                </View>
              </View>
              <View style={styles.alertActions}>
                <Button 
                  title="View Details" 
                  onPress={() => {}} 
                  variant="outline"
                  size="small"
                />
                <Button 
                  title="Resolve" 
                  onPress={() => {}} 
                  size="small"
                />
              </View>
            </Card>
          ))}
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
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.border,
  },
  activeTab: {
    borderBottomColor: theme.colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.textSecondary,
  },
  activeTabText: {
    color: theme.colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  mapSection: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
  },
  viewAllText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '500',
  },
  mapPlaceholder: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlaceholderText: {
    marginTop: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  mapPlaceholderSubtext: {
    marginTop: theme.spacing.xs,
    fontSize: 14,
    color: theme.colors.textTertiary,
  },
  section: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
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
  alertCard: {
    marginBottom: theme.spacing.md,
  },
  alertHeader: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  alertIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  alertInfo: {
    flex: 1,
  },
  alertMessage: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text,
    marginBottom: 4,
  },
  alertTime: {
    fontSize: 12,
    color: theme.colors.textTertiary,
  },
  alertActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: theme.spacing.sm,
  },
});