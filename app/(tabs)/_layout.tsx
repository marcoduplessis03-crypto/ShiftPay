import { Tabs } from "expo-router";
import { Text } from "react-native";
import { theme } from "../../lib/theme";

function TabIcon({
  symbol,
  focused,
}: {
  symbol: string;
  focused: boolean;
}) {
  return (
    <Text
      style={{
        color: focused ? theme.colors.green : theme.colors.muted2,
        fontSize: 18,
        fontWeight: "900",
      }}
    >
      {symbol}
    </Text>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="calculator"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.green,
        tabBarInactiveTintColor: theme.colors.muted2,
        tabBarStyle: {
          backgroundColor: "#070A12",
          borderTopColor: "rgba(255,255,255,0.1)",
          height: 74,
          paddingTop: 8,
          paddingBottom: 12,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "800",
        },
      }}
    >
      <Tabs.Screen
        name="calculator"
        options={{
          title: "Calculator",
          tabBarIcon: ({ focused }) => (
            <TabIcon symbol="∑" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ focused }) => (
            <TabIcon symbol="↺" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="stats"
        options={{
          title: "Stats",
          tabBarIcon: ({ focused }) => (
            <TabIcon symbol="▦" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <TabIcon symbol="⚙" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}