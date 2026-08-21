import * as Notifications from "expo-notifications";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Platform,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function NotificationSettingsScreen() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    Notifications.getPermissionsAsync().then(({ status }) => {
      setEnabled(status === "granted");
    });
  }, []);

  const handleToggle = async (value: boolean) => {
    if (value) {
      const { status } = await Notifications.requestPermissionsAsync();
      setEnabled(status === "granted");
      if (status !== "granted") {
        Alert.alert(
          "Permission needed",
          "Enable notifications in your device settings.",
        );
      }
    } else {
      setEnabled(false);
    }
  };

  const sendTestNotification = async () => {
    if (!enabled) {
      Alert.alert(
        "Enable notifications first",
        "Turn on the toggle above to send a test.",
      );
      return;
    }
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "QuickBite",
        body: "This is a test notification 🍽️",
      },
      trigger:
        Platform.OS === "web"
          ? null
          : {
              type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
              seconds: 2,
              repeats: false,
            },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Enable notifications</Text>
        <Switch value={enabled} onValueChange={handleToggle} />
      </View>

      <TouchableOpacity style={styles.button} onPress={sendTestNotification}>
        <Text style={styles.buttonText}>Send Test Notification</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: { fontSize: 22, fontWeight: "700", color: "#ff6b35" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  label: { fontSize: 16 },
  button: {
    backgroundColor: "#ff6b35",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 24,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
