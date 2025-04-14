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
  UserPlus,
  Filter,
  Upload
} from 'lucide-react-native';
import { theme } from '@/constants/colors';
import { SearchBar } from '@/components/ui/SearchBar';
import { Button } from '@/components/ui/Button';
import { UserCard } from '@/components/cards/UserCard';
import { users } from '@/mocks/users';

export default function UsersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // In a real app, you would fetch fresh data here
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <View style={styles.header}>
        <Text style={styles.title}>User Management</Text>
        <Text style={styles.subtitle}>Manage staff and user accounts</Text>
      </View>

      <View style={styles.searchContainer}>
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search users by name, email, or location"
        />
      </View>

      <View style={styles.actionsContainer}>
        <Button 
          title="Add User" 
          onPress={() => {}} 
          icon={<UserPlus size={16} color="#fff" />}
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
          title="Bulk Import" 
          onPress={() => {}} 
          variant="outline"
          icon={<Upload size={16} color={theme.colors.primary} />}
          size="small"
        />
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
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{users.length}</Text>
            <Text style={styles.statLabel}>Total Users</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {users.filter(u => u.status === 'active').length}
            </Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {users.filter(u => u.status === 'inactive').length}
            </Text>
            <Text style={styles.statLabel}>Inactive</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {users.filter(u => u.status === 'pending').length}
            </Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>

        <View style={styles.usersContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {filteredUsers.length} {filteredUsers.length === 1 ? 'User' : 'Users'}
            </Text>
            <TouchableOpacity>
              <Text style={styles.sortText}>Sort by: Name</Text>
            </TouchableOpacity>
          </View>

          {filteredUsers.map(user => (
            <UserCard
              key={user.id}
              id={user.id}
              name={user.name}
              email={user.email}
              phone={user.phone}
              role={user.role}
              status={user.status}
              location={user.location}
              avatar={user.avatar}
              onPress={() => {}}
            />
          ))}

          {filteredUsers.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No users found matching "{searchQuery}"
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    marginHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  usersContainer: {
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