import { Geolocation } from '@capacitor/geolocation'
import { DataInsert, SpecificsForGroups, TableData } from 'src/constants/Interfaces'
import { conexionBD } from 'src/stores/conexionBD'
import { CapacitorSQLite, SQLiteConnection, ISQLiteDBConnection, DBSQLiteValues } from '@capacitor-community/sqlite'

export interface FilterFnParams {
  val: string;
  update: (callback: () => void) => void;
}

export class Builder {
  db!: ISQLiteDBConnection
  sq

  constructor() {
    const { DB, SQLITE } = conexionBD()
    this.db = DB
    this.sq = SQLITE
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
}
