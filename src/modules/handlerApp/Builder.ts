import { Geolocation } from '@capacitor/geolocation'
import { Network, NetworkStatus } from '@capacitor/network'
import { useStatusNetwork } from 'src/stores/global'
import { DataInsert, SpecificsForGroups, TableData } from 'src/constants/Interfaces'
import { conexionBD } from 'src/stores/conexionBD'
import { CapacitorSQLite, SQLiteConnection, ISQLiteDBConnection, DBSQLiteValues, capSQLiteChanges } from '@capacitor-community/sqlite'
import { getEstablishmentsUrl, uploadInterviewsUrl } from 'src/constants/config'
import { api, MODE } from 'src/boot/axios'
import { getCurrentInstance } from 'vue'
import axios, { AxiosResponse, AxiosError, AxiosProgressEvent } from 'axios'
import { Establishment, EstablishmentsResponse, PartialImport, DataResponseServer } from 'src/constants/Interfaces'
import { generateDate } from 'src/constants/constants'
import {
  schemaMunicipios,
  schemaSendFilesHistory,
  schemaEstablecimientos,
  schemaVisitas,
  triggerEstablecimientos,
  insertMunicipios,
  insertEstablecimientos,
  resetEstablecimientos
} from 'src/constants/schemas'

export interface FilterFnParams {
  val: string;
  update: (callback: () => void) => void;
}

export class Builder {
  db!: ISQLiteDBConnection
  sq
  mode: MODE
  statusNetwork

  constructor() {
    const { DB, SQLITE } = conexionBD()
    const appContext = getCurrentInstance()
    this.mode = appContext?.appContext.config.globalProperties.$mode
    this.db = DB
    this.sq = SQLITE
    this.statusNetwork = useStatusNetwork()
  }

  async printCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition()
    console.log('Current position:', coordinates)
    return coordinates
  }

  async checkGps(): Promise<boolean> {
    try {
      const result = await Geolocation.checkPermissions()
      if (result.location === 'granted') {
        return true
      } else {
        await Geolocation.requestPermissions()
        return false
      }
    } catch (e) {
      throw new Error('Por favor activa el GPS para poder continuar')
    }
  }

  async saveFile(data: DataInsert) {
    return new Promise(async (resolve, reject) => {
      try {
        this.db.open()
        await this.db.execute(`INSERT INTO visitas (id_form, formato, json_data) VALUES ('${data.id}', '${data.identificadorEntrevista}', '${JSON.stringify(data)}')`)
        this.db.close()
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  async getVisits(formatName: string): Promise<TableData[]> {
    this.db.open()
    const visits = await this.db.query(`SELECT * FROM visitas WHERE formato = "${formatName}" AND sql_deleted = 0`)
    this.db.close()
    return visits.values as TableData[]
  }

  createFilterQuery(specificsForGroups: SpecificsForGroups<'GENERALS_FILTERS'>, id?: number): { [key: string]: any } {
    const querys: { [key: string]: any } = {
      Municipality: {
        query: `SELECT * FROM municipios WHERE LOWER(nom_municipio) LIKE ?`,
        default: `SELECT * FROM municipios ORDER BY nom_municipio LIMIT 10`
      },
      Entity: {
        query: `SELECT * FROM establecimientos WHERE nom_establecimiento LIKE ?
        AND dane_municipio = ?`,
        default: `SELECT * FROM establecimientos WHERE dane_municipio = ${id}  LIMIT 10`
      },
      Address: {
        query: `SELECT * FROM establecimientos WHERE direccion LIKE ?
        AND doc_establecimiento = ?`,
        default: `SELECT * FROM establecimientos WHERE doc_establecimiento = ${id}  LIMIT 10`
      }
    }

    return querys[specificsForGroups]
  }

  async filterFn({ val, update }: FilterFnParams, specificsForGroups: SpecificsForGroups<'GENERALS_FILTERS'>, id?: number): Promise<DBSQLiteValues[]> {
    let result: DBSQLiteValues[] | undefined = []
    console.log('entre al filtro')
    this.db.open()
    if (val === '') {
      const query = this.createFilterQuery(specificsForGroups, id).default
      const res = await this.db.query(query)
      update(async () => {
        result = res.values
        this.db.close()
      })
    }
    console.log(result)
    if (val.length > 2) {
      const needle = `%${val.toLowerCase()}%`

      try {
        // const query = `SELECT * FROM municipios WHERE LOWER(nom_municipio) LIKE ?`
        const query = this.createFilterQuery(specificsForGroups).query
        const params: (string | number)[] = [needle]
        if (id) params.push(id)
        console.log(params, id)
        const res = await this.db.query(query, params)
        console.log(res)

        if (res.values && res.values.length > 0) {
          update(() => {
            result = res.values
          })
        } else {
          update(() => {
            result = []
          })
        }

        await this.db.close()
      } catch (error) {
        console.error('Error al consultar la base de datos:', error);
      }
    }
    console.log(result)
    return result
  }

  /**
   * Obtiene una lista de establecimientos basándose en las credenciales del usuario y el timestamp proporcionados.
   *
   * @param {Object} data - Un objeto que contiene el nombre de usuario, contraseña y timestamp.
   * @param {string} data.username - El nombre de usuario del usuario.
   * @param {string} data.password - La contraseña del usuario.
   * @param {string} data.timestamp - El timestamp de la solicitud.
   * @param {Function} progressHandler - Una función para manejar el progreso de descarga de la solicitud.
   * @param {AxiosProgressEvent} progressHandler.progress - El evento de progreso de la descarga.
   * @return {Promise<EstablishmentsResponse>} Una promesa que se resuelve con los datos de la respuesta que contiene la lista de establecimientos.
   * @throws {Error} Si el nombre de usuario o la contraseña está faltando.
   * @throws {Error} Si hay un error durante la solicitud de la API.
   */
  async getEstablishments(data: { username: string, password: string, timestamp: string }): Promise<EstablishmentsResponse> {
    if (!data.username || !data.password) {
      throw new Error('invalidUser');
    }
    let response: AxiosResponse<EstablishmentsResponse>
    try {
      response = await api.post(getEstablishmentsUrl,
        {
          usuario: data.username,
          clave: data.password,
          timestamp: data.timestamp
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message)
      } else {
        throw new Error('Error desconocido')
      }
    }
    return response.data
  }

  async createDatabase(): Promise<void> {
    try {
      //Crear base de datos
      this.db.open()
      await this.db.execute(schemaMunicipios)
      await this.db.execute(schemaSendFilesHistory)
      await this.db.execute(schemaEstablecimientos)
      await this.db.execute(schemaVisitas)
      await this.db.execute(triggerEstablecimientos)
      this.db.close()
    } catch (error: any) {
      this.db.close()
      throw new Error(`Error creando base de datos: ${error.message || error}`)
    }
  }

  async createSyncTable(): Promise<void> {
    try {
      this.db.open()
      await this.db.createSyncTable()
      this.db.close()
    } catch (error: any) {
      this.db.close()
      throw new Error(`Error creando tabla de sincronización: ${error.message || error}`)
    }
  }

  async insertMunicipalities(): Promise<void> {
    try {
      this.db.open()
      const query = await this.db.query('SELECT * FROM municipios')
      if (query.values && query.values.length == 0) {
        await this.db.execute(insertMunicipios)
      }
      this.db.close()
    } catch (error: any) {
      this.db.close()
      throw new Error(`Error insertando municipios: ${error.message || error}`)
    }
  }

  async insertEstablishmentsDevMode(): Promise<void> {
    if (this.mode === MODE.DEVELOPMENT) {
      try {
        this.db.open()
        const query = await this.db.query('SELECT * FROM establecimientos LIMIT 3')
        if (query.values && query.values.length === 0) {
          await this.db.execute(insertEstablecimientos)
        }
        this.db.close()
      } catch (error: any) {
        this.db.close()
        throw new Error(`Error insertando establecimientos: ${error.message || error}`)
      }
    }
  }

  async checkInternetConnection(): Promise<boolean> {
    const status = await Network.getStatus();
    if (status.connected) {
      this.statusNetwork.state = 'Online'
      console.info('¡Conectado a Internet!')
      return true
    } else {
      this.statusNetwork.state = 'Offline'
      console.info('No hay conexión a Internet.')
      return false
    }
  }

  initializeNetworkListener() {
    Network.addListener('networkStatusChange', (status: NetworkStatus) => {
      if (status.connected) {
        this.statusNetwork.state = 'Online'
        console.info('¡Conectado a Internet!')
      } else {
        this.statusNetwork.state = 'Offline'
        console.info('No hay conexión a Internet.')
      }
    })
  }

  /* parseToImportFromJSON(json: Establishment[]): string {
    const result = json.map((item, index: number) => ({
      id: index + 1,
      daneMunicipio: item.daneMunicipio,
      documentoEstablecimiento: item.documentoEstablecimiento,
      nombreEstablecimiento: item.nombreEstablecimiento,
      direccionEstablecimiento: item.direccionEstablecimiento,
      sql_deleted: parseInt(item.sql_deleted),
      last_modified: parseInt(item.last_modified)
    }))

    const partialImport = {
      database: 'uesvalle',
      version: 2,
      encrypted: false,
      mode: 'partial',
      tables: [{
        name: 'establecimientos',
        values: result
      }]
    }

    return JSON.stringify(partialImport)
  } */

  parseToImportFromJSON(json: Establishment[]): PartialImport {
    const result: Array<Array<number | string | null>> = []
    let i = 0

    for (const item of json) {
      result[i] = []
      result[i][0] = item.id
      result[i][1] = item.daneMunicipio
      result[i][2] = item.documentoEstablecimiento
      result[i][3] = item.nombreEstablecimiento
      result[i][4] = item.direccionEstablecimiento
      result[i][5] = parseInt(item.sql_deleted)
      result[i][6] = parseInt(item.last_modified)
      i++
    }

    console.info(result)

    const partialImport: PartialImport = {
      database: 'uesvalle',
      version: 2,
      encrypted: false,
      mode: 'partial',
      tables: [{
        name: 'establecimientos',
        values: result
      }]
    }

    return partialImport
  }

  async getTimestamp(): Promise<string> {
    this.db.open()
    const visits = await this.db.query('SELECT MAX(last_modified) AS timestamp FROM establecimientos') ?? { values: [{ timestamp: 0 }] }
    this.db.close()
    if (!visits.values || visits.values.length === 0) return '0'
    else return visits.values[0].timestamp
  }

  async importFromJSON(partialImport: PartialImport): Promise<capSQLiteChanges> {
    try {
      const result = await this.sq.importFromJson(JSON.stringify(partialImport))
      return result
    } catch (error: any) {
      throw new Error(`Error importando datos: ${error.message || error}`)
    }
  }

  async prepareSubmissionData(username: string, password: string): Promise<{ formData: FormData, files: { id: string, usuarioEntrevistador: number }[] }> {
    try {
      this.db.open()
      const files = []
      const formData = new FormData()

      const visitas = await this.db.query('SELECT id_form, json_data FROM visitas WHERE sql_deleted = 0')
      this.db.close()
      if (visitas.values && visitas.values.length > 0) {
        for (const item of visitas.values) {
          files.push(JSON.parse(item.json_data))
          const blob = new Blob([item.json_data],
            {
              type: 'application/json'
            })
          formData.append('Documentos_json[]', blob, item.id_form)
        }
      }

      formData.append('usuario', username)
      formData.append('clave', password)

      return { formData, files }
    } catch (error: any) {
      throw new Error(`Error preparando datos: ${error.message || error}`)
    }
  }

  async submitVisits(formData: FormData): Promise<void> {
    try {
      const response: AxiosResponse<DataResponseServer> = await api.post(uploadInterviewsUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (response.data.error) {
        console.error(response.data.mensaje, response.data.trace, response.data.error)
        throw new Error(response.data.mensaje)
      }
    } catch (error: any) {
      throw new Error(`Error cargando datos: ${error.message || error}`)
    }
  }

  async logFileHistory(files: { id: string, usuarioEntrevistador: number }[], userName: string): Promise<void> {
    try {
      const fecha = generateDate()
      this.db.open()
      for (const item of files) {
        await this.db.execute(`INSERT INTO send_files_history (id_file, id_user_file, id_user_send, json_data, date) VALUES ('${item.id}',${item.usuarioEntrevistador},${userName},'${JSON.stringify(item)}','${fecha}')`)
      }
      await this.db.execute('DELETE FROM visitas')
      this.db.close()
    } catch (error: any) {
      this.db.close()
      throw new Error(`Error insertando historial: ${error.message || error}`)
    }
  }
}
