import { Geolocation } from '@capacitor/geolocation'
import { dataInsert, SpecificsForGroups } from 'src/constants/Interfaces'
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

  async saveFile(data: dataInsert) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.db.execute(`INSERT INTO visitas (id_form, formato, json_data) VALUES ('${data.id}', '${data.identificadorEntrevista}', '${JSON.stringify(data)}')`)
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  createFilterQuery(specificsForGroups: SpecificsForGroups<'GENERALS_FILTERS'>): string {
    const querys: { [key: string]: any } = {
      Municipality: {
        query: `SELECT * FROM municipios ORDER BY nom_municipio LIKE ?`
      },
      Entity: {
        query: `SELECT * FROM establecimientos WHERE dane_municipio = ?
        AND nom_establecimiento LIKE ?`
      },
      Adress: {
        query: `SELECT * FROM establecimientos WHERE doc_establecimiento = ?
        AND direccion LIKE ?`
      }
    }

    return querys[specificsForGroups].query
  }

  async filterFn({ val, update }: FilterFnParams, specificsForGroups: SpecificsForGroups<'GENERALS_FILTERS'>, id?: number): Promise<object[]> {
    let result: DBSQLiteValues[] | undefined = []
    console.log('entre al filtro')
    if (val === '') {
      update(() => {
        result = []
      })
    } else if (val.length > 2) {
      const needle = `%${val.toLowerCase()}%`

      try {
        this.db.open()

        const query = `SELECT * FROM municipios WHERE nom_municipio LIKE %oba%`
        // const query = this.createFilterQuery(specificsForGroups)
        console.log(query, val)
        const params: (string | number)[] = [needle]
        if (id) params.push(id)

        const res = await this.db.query(query)

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

    return result
  }
}
