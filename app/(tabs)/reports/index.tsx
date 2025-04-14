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
  BarChart3,
  PieChart,
  Download,
  Calendar,
  Share2
} from 'lucide-react-native';
import { theme } from '@/constants/colors';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { dashboardStats } from '@/mocks/stats';

export default function ReportsScreen() {
  const [activeTab, setActiveTab] = useState('overview');
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
      <View style={styles.header}>
        <Text style={styles.title}>Reports & Analytics</Text>
        <Text style={styles.subtitle}>View performance metrics and generate reports</Text>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'overview' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('overview')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'overview' && styles.activeTabText,
            ]}
          >
            Overview
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'compliance' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('compliance')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'compliance' && styles.activeTabText,
            ]}
          >
            Compliance
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'performance' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('performance')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'performance' && styles.activeTabText,
            ]}
          >
            Performance
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
        <View style={styles.actionsContainer}>
          <Button 
            title="Export Report" 
            onPress={() => {}} 
            variant="outline"
            icon={<Download size={16} color={theme.colors.primary} />}
            size="small"
          />
          <Button 
            title="Schedule Report" 
            onPress={() => {}} 
            variant="outline"
            icon={<Calendar size={16} color={theme.colors.primary} />}
            size="small"
          />
          <Button 
            title="Share" 
            onPress={() => {}} 
            variant="outline"
            icon={<Share2 size={16} color={theme.colors.primary} />}
            size="small"
          />
        </View>

        <View style={styles.dateRangeContainer}>
          <Text style={styles.dateRangeLabel}>Date Range:</Text>
          <TouchableOpacity style={styles.dateRangePicker}>
            <Text style={styles.dateRangeText}>Last 30 Days</Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'overview' && (
          <>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Exam Statistics</Text>
              </View>
              <Card>
                <View style={styles.chartContainer}>
                  <View style={styles.chartPlaceholder}>
                    <BarChart3 size={32} color={theme.colors.primary} />
                    <Text style={styles.chartPlaceholderText}>
                      Exam completion rates chart
                    </Text>
                  </View>
                  <View style={styles.chartLegend}>
                    <View style={styles.legendItem}>
                      <View style={[styles.legendColor, { backgroundColor: theme.colors.primary }]} />
                      <Text style={styles.legendText}>Completed</Text>
                    </View>
                    <View style={styles.legendItem}>
                      <View style={[styles.legendColor, { backgroundColor: theme.colors.secondary }]} />
                      <Text style={styles.legendText}>In Progress</Text>
                    </View>
                    <View style={styles.legendItem}>
                      <View style={[styles.legendColor, { backgroundColor: theme.colors.warning }]} />
                      <Text style={styles.legendText}>Upcoming</Text>
                    </View>
                  </View>
                </View>
              </Card>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>User Activity</Text>
              </View>
              <Card>
                <View style={styles.chartContainer}>
                  <View style={styles.chartPlaceholder}>
                    <PieChart size={32} color={theme.colors.secondary} />
                    <Text style={styles.chartPlaceholderText}>
                      User activity distribution
                    </Text>
                  </View>
                  <View style={styles.chartLegend}>
                    <View style={styles.legendItem}>
                      <View style={[styles.legendColor, { backgroundColor: theme.colors.primary }]} />
                      <Text style={styles.legendText}>Proctors</Text>
                    </View>
                    <View style={styles.legendItem}>
                      <View style={[styles.legendColor, { backgroundColor: theme.colors.secondary }]} />
                      <Text style={styles.legendText}>Center Managers</Text>
                    </View>
                    <View style={styles.legendItem}>
                      <View style={[styles.legendColor, { backgroundColor: theme.colors.info }]} />
                      <Text style={styles.legendText}>Admins</Text>
                    </View>
                  </View>
                </View>
              </Card>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Key Metrics</Text>
              </View>
              <View style={styles.metricsContainer}>
                <View style={styles.metricCard}>
                  <Text style={styles.metricValue}>98%</Text>
                  <Text style={styles.metricLabel}>Staff Attendance</Text>
                </View>
                <View style={styles.metricCard}>
                  <Text style={styles.metricValue}>92%</Text>
                  <Text style={styles.metricLabel}>Document Submission</Text>
                </View>
                <View style={styles.metricCard}>
                  <Text style={styles.metricValue}>99%</Text>
                  <Text style={styles.metricLabel}>Geofence Compliance</Text>
                </View>
                <View style={styles.metricCard}>
                  <Text style={styles.metricValue}>95%</Text>
                  <Text style={styles.metricLabel}>Overall Compliance</Text>
                </View>
              </View>
            </View>
          </>
        )}

        {activeTab === 'compliance' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Compliance Metrics</Text>
            </View>
            <Card>
              <View style={styles.complianceContainer}>
                <View style={styles.complianceItem}>
                  <Text style={styles.complianceLabel}>Document Submission</Text>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { 
                          width: `${dashboardStats.complianceMetrics.documentSubmission}%`,
                          backgroundColor: theme.colors.primary 
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.complianceValue}>
                    {dashboardStats.complianceMetrics.documentSubmission}%
                  </Text>
                </View>
                
                <View style={styles.complianceItem}>
                  <Text style={styles.complianceLabel}>Staff Attendance</Text>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { 
                          width: `${dashboardStats.complianceMetrics.staffAttendance}%`,
                          backgroundColor: theme.colors.success 
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.complianceValue}>
                    {dashboardStats.complianceMetrics.staffAttendance}%
                  </Text>
                </View>
                
                <View style={styles.complianceItem}>
                  <Text style={styles.complianceLabel}>Geofence Compliance</Text>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { 
                          width: `${dashboardStats.complianceMetrics.geofenceCompliance}%`,
                          backgroundColor: theme.colors.info 
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.complianceValue}>
                    {dashboardStats.complianceMetrics.geofenceCompliance}%
                  </Text>
                </View>
                
                <View style={styles.complianceItem}>
                  <Text style={styles.complianceLabel}>Report Completion</Text>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { 
                          width: `${dashboardStats.complianceMetrics.reportCompletion}%`,
                          backgroundColor: theme.colors.secondary 
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.complianceValue}>
                    {dashboardStats.complianceMetrics.reportCompletion}%
                  </Text>
                </View>
              </View>
            </Card>
          </View>
        )}

        {activeTab === 'performance' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Performance Metrics</Text>
            </View>
            <Card>
              <View style={styles.chartContainer}>
                <View style={styles.chartPlaceholder}>
                  <BarChart3 size={32} color={theme.colors.secondary} />
                  <Text style={styles.chartPlaceholderText}>
                    Staff performance metrics
                  </Text>
                </View>
              </View>
            </Card>
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Generate Custom Report</Text>
          </View>
          <Card>
            <View style={styles.customReportContainer}>
              <Text style={styles.customReportText}>
                Create a custom report by selecting parameters and data points
              </Text>
              <Button 
                title="Create Custom Report" 
                onPress={() => {}} 
                style={styles.customReportButton}
              />
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
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  dateRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  dateRangeLabel: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginRight: theme.spacing.sm,
  },
  dateRangePicker: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
  },
  dateRangeText: {
    fontSize: 14,
    color: theme.colors.text,
  },
  section: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  sectionHeader: {
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
  },
  chartContainer: {
    padding: theme.spacing.md,
  },
  chartPlaceholder: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
  },
  chartPlaceholderText: {
    marginTop: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: theme.spacing.md,
    gap: theme.spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: theme.spacing.xs,
  },
  legendText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  metricCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  metricLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  complianceContainer: {
    padding: theme.spacing.md,
  },
  complianceItem: {
    marginBottom: theme.spacing.md,
  },
  complianceLabel: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.colors.divider,
    borderRadius: 4,
    marginBottom: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  complianceValue: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textAlign: 'right',
  },
  customReportContainer: {
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  customReportText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  customReportButton: {
    minWidth: 200,
  },
});