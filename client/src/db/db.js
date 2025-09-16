// import * as SQLite from "expo-sqlite";

// const db = SQLite.openDatabase("farmers.db");

// Initialize the database and create table if not exists
// export const initDb = () => {
//   return new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         `CREATE TABLE IF NOT EXISTS farmers (
//           phone TEXT PRIMARY KEY NOT NULL,
//           name TEXT,
//           age INTEGER,
//           gender TEXT
//         );`,
//         [], // No SQL params here
//         () => {
//           // Success callback
//           resolve();
//         },
//         (_, error) => {
//           // Failure callback
//           reject(error);
//           return false; // Important to indicate error handled
//         }
//       );
//     });
//   });
// };

// Insert phone number into farmers table, ignore if exists
// export const insertFarmerPhone = (phone) => {
//   return new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         `INSERT OR IGNORE INTO farmers (phone) VALUES (?);`,
//         [phone],
//         (_, result) => resolve(result),
//         (_, error) => {
//           reject(error);
//           return false;
//         }
//       );
//     });
//   });
// };
