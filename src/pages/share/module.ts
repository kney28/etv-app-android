import { Store } from 'pinia'
import { useShare } from 'src/stores/share'
import { Share as CapacitorShare } from '@capacitor/share'
import { Filesystem, Directory, WriteFileResult } from '@capacitor/filesystem'
import { conexionBD } from 'src/stores/conexionBD'
import { ISQLiteDBConnection } from '@capacitor-community/sqlite'

export class Share {
  storeShare: Store<'share', { [key: string]: any; }>
  db!: ISQLiteDBConnection
  constructor() {
    this.storeShare = {} as Store<'share', { [key: string]: any; }>
  }

  setStores() {
    this.storeShare = useShare()
    this.db = conexionBD().DB
  }

  async permissions(): Promise<boolean> {
    try {
      const result = await Filesystem.checkPermissions()
      if (result.publicStorage === 'granted') {
        return true
      } else {
        await Filesystem.requestPermissions()
        return false
      }
    } catch (e) {
      throw new Error('Por favor otorga permisos para poder continuar')
    }
  }

  async share() {
    try {
      if (true) {
        const file = await this.storeShare.createBlob
        const result = await this.writeFile('entrevistas.zip', file)
        console.log(result.uri)
        await CapacitorShare.share({
          title: 'Entrevistas_proceso_etv',
          text: 'Se compartiran las entrevistas realizadas',
          url: result.uri,
          dialogTitle: 'Compartir con...'
        })
        await Filesystem.deleteFile({
          path: 'entrevistas.zip',
          directory: Directory.Cache,
        })
      }
    } catch (error: any) {
      console.error('Error al compartir:', error)
      if (error.message === 'Share canceled') {
        throw new Error('Operación cancelada')
      }
      throw error
    }
  }

  async writeFile(fileName: string, data: string): Promise<WriteFileResult> {
    try {
      return await Filesystem.writeFile({
        path: fileName,
        data: data,
        directory: Directory.Cache
      })
    } catch (error) {
      console.error('Error al escribir el archivo:', error)
      throw error
    }
  }

  async loadFiles(): Promise<void> {
    this.db.open()
    const visits = await this.db.query(`SELECT * FROM visitas WHERE sql_deleted = 0`)
    this.db.close()
    this.storeShare.tableData = visits.values
  }

  setItems() {
    this.storeShare.json = this.storeShare.tableData.map((item: { json_data: string }) => item.json_data)
    console.log(this.storeShare.json)
  }
}

export const routeStatic = new Share()