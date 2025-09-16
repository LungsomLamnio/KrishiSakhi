import * as FileSystem from "expo-file-system";

export const exportDatabase = async () => {
  try {
    // Default SQLite DB location for Expo apps:
    const dbFilePath = `${FileSystem.documentDirectory}SQLite/farmers.db`;

    // Destination path to save exported copy for user access:
    // You can modify the filename or folder as needed
    const destPath = `${FileSystem.documentDirectory}farmers_copy.db`;

    // Copy the database file to the new location
    await FileSystem.copyAsync({
      from: dbFilePath,
      to: destPath,
    });

    console.log("Database exported successfully to:", destPath);

    // Optional: Show alert or share the file with user here
    return destPath;
  } catch (error) {
    console.error("Error exporting DB:", error);
    throw error;
  }
};
