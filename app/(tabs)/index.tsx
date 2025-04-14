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
  Users, 
  Clipboard, 
  Bell, 
  Calendar,
  ChevronRight,
  BarChart3
} from 'lucide-react-native';
import { theme } from '@/constants/colors';
import { StatCard } from '@/components/cards/StatCard';
import { ActivityItem } from '@/components/cards/ActivityItem';
import { AlertItem } from '@/components/cards/AlertItem';
import { ExamCard } from '@/components/cards/ExamCard';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { useAuthStore } from '@/store/auth-store';
import { dashboardStats } from '@/mocks/stats';

export default function DashboardScreen() {
  const { user } = useAuthStore();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // In a real app, you would fetch fresh data here
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>{user?.name}</Text>
          </View>
          <Avatar uri={user?.avatar} name={user?.name} size="medium" />
        </View>

        <View style={styles.statsContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.statsScrollContent}
          >
            <StatCard
              title="Active Exams"
              value={dashboardStats.activeExams}
              icon={<Clipboard size={20} color={theme.colors.primary} />}
              color={theme.colors.primary}
            />
            <StatCard
              title="Registered Users"
              value={dashboardStats.registeredUsers}
              icon={<Users size={20} color={theme.colors.secondary} />}
              color={theme.colors.secondary}
            />
            <StatCard
              title="Pending Approvals"
              value={dashboardStats.pendingApprovals}
              icon={<Bell size={20} color={theme.colors.warning} />}
              color={theme.colors.warning}
            />
            <StatCard
              title="Completed Exams"
              value={dashboardStats.completedExams}
              icon={<BarChart3 size={20} color={theme.colors.success} />}
              color={theme.colors.success}
            />
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Alerts</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          {dashboardStats.alerts.map((alert) => (
            <AlertItem
              key={alert.id}
              type={alert.type}
              message={alert.message}
              severity={alert.severity as any}
              timestamp={alert.timestamp}
            />
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Exams in Progress</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          {dashboardStats.examsInProgress.map((exam) => (
            <ExamCard
              key={exam.id}
              id={exam.id}
              title={exam.title}
              date={exam.date}
              centers={exam.centers}
              staff={exam.staff}
              status={exam.status}
              completion={exam.completion}
            />
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Exams</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          {dashboardStats.upcomingExams.slice(0, 2).map((exam) => (
            <ExamCard
              key={exam.id}
              id={exam.id}
              title={exam.title}
              date={exam.date}
              centers={exam.centers}
              staff={exam.staff}
              status={exam.status}
            />
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <Card>
            {dashboardStats.recentActivity.slice(0, 4).map((activity) => (
              <ActivityItem
                key={activity.id}
                type={activity.type}
                message={activity.message}
                timestamp={activity.timestamp}
                user={activity.user}
              />
            ))}
            <TouchableOpacity style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>View more activity</Text>
              <ChevronRight size={16} color={theme.colors.primary} />
            </TouchableOpacity>
          </Card>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Calendar</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View calendar</Text>
            </TouchableOpacity>
          </View>
          <Card>
            <View style={styles.calendarPlaceholder}>
              <Calendar size={32} color={theme.colors.textSecondary} />
              <Text style={styles.calendarText}>
                Calendar view would be displayed here
              </Text>
            </View>
          </Card>
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
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  greeting: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.text,
  },
  statsContainer: {
    marginVertical: theme.spacing.md,
  },
  statsScrollContent: {
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  section: {
    marginBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
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
  seeAllText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '500',
  },
  viewMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
    marginTop: theme.spacing.sm,
  },
  viewMoreText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '500',
    marginRight: theme.spacing.xs,
  },
  calendarPlaceholder: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarText: {
    marginTop: theme.spacing.md,
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
});