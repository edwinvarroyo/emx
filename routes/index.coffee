express = require('express')
request = require('request')
router = express.Router()
estacionamientos = require('./routes-estacionamientos')(router)


### GET home page. ###

router
.get '/', (req, res, next) ->
  res.render 'index'
  return

.get '/login', (req,res) ->
	res.render 'login'

.get '/go', (req,res) ->
	request 'http://datos.labcd.mx/api/action/datastore_search?resource_id=4366bf30-01eb-4fa0-9f2a-c74153ec2b79&limit=5', (error,response,body) ->
		if !error and response.statusCode == 200
			res.send(body)

module.exports = router