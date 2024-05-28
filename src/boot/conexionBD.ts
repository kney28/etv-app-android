import { App } from 'vue';
import { conexionBD } from 'src/stores/conexionBD';
import { storeToRefs } from "pinia";
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';

const conn = conexionBD();
const { DB, SQLITE } = storeToRefs(conn);
const sqlite = new SQLiteConnection(CapacitorSQLite)

export default async ({ app }: { app: App }) => {
  const ret = await sqlite.checkConnectionsConsistency()
  console.log(`after checkConnectionsConsistency ${ret.result}`)
  const isConn = await sqlite.isConnection('uesvalle', false).then(
    (result) => {
      console.log(`after isConnection ${result}`)
      return result
    }
  )
  
  let db

  if (ret.result && isConn.result) {
    db = await sqlite.retrieveConnection('uesvalle', false)
  } else {
    db = await sqlite.createConnection('uesvalle', false, 'no-encryption', 1, false)
  }
  console.log(`Luego de create/retrieveConnection ${JSON.stringify(db)}`)

  // Acceder a CapacitorSQLite desde toda la aplicación
  DB.value = db
  SQLITE.value = sqlite
};

