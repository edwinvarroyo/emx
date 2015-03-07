mongoose 	= require('./models')
Schema 		= mongoose.Schema

estacionamientoSchema = new Schema 
		id_estacionamiento: Number
		precio: Number
		rating: Number
		disponibilidad: String 
		### 
			rojo: 		#e53935
			amarillo: 	#ffee58
			verde:		#64dd17
		####			
	
module.exports = mongoose.model 'estacionamiento', estacionamientoSchema