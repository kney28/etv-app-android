export const TIPOCRIADERO = [
	'Tanques bajos',
	'Llantas',
	'Floreros / plantas',
	'Tina (> 55Gal)',
	'Tarros - baldes (< 55Gal)',
	'Criaderos naturales',
	'Botellas',
	'Diversos',
]


export const generateDate = () => {
	const fecha = new Date()
	const opciones: any = {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	}
	const formatoFecha = new Intl.DateTimeFormat('es-CO', opciones)
	const fechaFormateada = formatoFecha.format(fecha)

	return fechaFormateada
}

export const saveFile = async (data: any, db: any) => {
	return new Promise(async (resolve, reject) => {
		try {
			await db.open()
			await db.execute(`INSERT INTO visitas (id_form, formato, json_data) VALUES ('${data.id}', '${data.identificadorEntrevista}', '${JSON.stringify(data)}')`)
			await db.close()
			resolve(true)
		} catch (error) {
			await db.close()
			reject(error)
		}
	})
}