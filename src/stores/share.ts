import { defineStore } from 'pinia'
import { TableData, TableColumns } from 'src/constants/Interfaces'
import JSzip from 'jszip'

interface Share {
  tableData: TableData[] | null,
  tableColumns: TableColumns[] | null
  json: any
}

function isValidJson(value: string) {
  try {
    JSON.parse(value)
    return true
  } catch {
    return false
  }
}

export const useShare = defineStore('share', {
  state: (): Share => ({
    tableData: [
      { id: '1', formato: 'F-AM-1', id_form: 'FAMA01', fecha: '2023-01-01' },
    ],
    tableColumns: [
      { name: 'codigo', align: 'left', label: 'Código', field: 'id_form', sortable: true },
      { name: 'formato', align: 'left', label: 'Formato', field: 'formato', sortable: true },
      {
        name: 'fecha', align: 'left', label: 'Fecha', field: (row: any) => {
          const valid = isValidJson(row.json_data)
          return valid ? JSON.parse(row.json_data).fecha : ''
        }, sortable: true
      },
    ],
    json: []
  }),
  getters: {
    async createBlob(): Promise<string> {
      try {
        const zip = new JSzip()

        // 1. Iterar sobre el array y crear un archivo JSON por cada objeto
        this.json.forEach((data: any, index: number) => {
          const jsonParse = JSON.parse(data)
          const fileName = `file_etv_${jsonParse.identificadorEntrevista}_${jsonParse.usuarioEntrevistador}_${index + 1}.json`
          zip.file(fileName.toUpperCase(), data) // Nombrar cada archivo
        })

        // 2. Generar el archivo comprimido
        const zipBlob = await zip.generateAsync({ type: 'base64' })

        return zipBlob
      } catch (error) {
        console.error('Error al convertir y comprimir múltiples archivos:', error)
        throw error
      }
    }
  }
})