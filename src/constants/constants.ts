export const TIPOCRIADERO = [
	{
			id: 'tanques_bajos',
			description: 'Tanques bajos'
	},
	{
			id: 'llantas',
			description: 'Llantas'
	},
	{
			id: 'floreros_plantas',
			description: 'Floreros / plantas'
	},
	{
			id: 'tina',
			description: 'Tina (> 55Gal)'
	},
	{
			id: 'tarros_baldes',
			description: 'Tarros - baldes (< 55Gal)'
	},
	{
			id: 'criaderos_naturales',
			description: 'Criaderos naturales'
	},
	{
			id: 'botellas',
			description: 'Botellas'
	},
	{
			id: 'diversos',
			description: 'Diversos'
	},
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
			await db.execute(`INSERT INTO visitas (id_form, formato, json_data) VALUES ('${data.id}', '${data.identificadorEntrevista}', '${JSON.stringify(data)}')`)
			resolve(true)
		} catch (error) {
			reject(error)
		}
	})	
}