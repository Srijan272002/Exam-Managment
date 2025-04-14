import React from "react";
import { Tabs } from "expo-router";
import { 
  Home, 
  Users, 
  FileText, 
  Activity, 
  BarChart3, 
  Settings,
  Clipboard
} from "lucide-react-native";
import { theme } from "@/constants/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textTertiary,
        tabBarStyle: {
          borderTopColor: theme.colors.border,
          backgroundColor: theme.colors.card,
        },
        headerStyle: {
          backgroundColor: theme.colors.card,
        },
        headerTitleStyle: {
          color: theme.colors.text,
          fontWeight: '600',
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Home size={size - 2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="users/index"
        options={{
          title: "Users",
          tabBarIcon: ({ color, size }) => (
            <Users size={size - 2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="exams/index"
        options={{
          title: "Exams",
          tabBarIcon: ({ color, size }) => (
            <Clipboard size={size - 2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="monitoring/index"
        options={{
          title: "Monitoring",
          tabBarIcon: ({ color, size }) => (
            <Activity size={size - 2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="documents/index"
        options={{
          title: "Documents",
          tabBarIcon: ({ color, size }) => (
            <FileText size={size - 2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reports/index"
        options={{
          title: "Reports",
          tabBarIcon: ({ color, size }) => (
            <BarChart3 size={size - 2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Settings size={size - 2} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}