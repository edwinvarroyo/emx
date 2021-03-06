// Generated by CoffeeScript 1.9.1
var estacionamientos, gl, qs, request;

request = require('request');

qs = require('query-string');

gl = require('geolib');

estacionamientos = require('../models/model-estacionamiento');

module.exports = function(router) {
  var data, url;
  url = 'http://datos.labcd.mx/api/action/datastore_search';
  data = {
    resource_id: '4366bf30-01eb-4fa0-9f2a-c74153ec2b79'
  };
  return router.get('/first_five', function(req, res) {
    var query;
    query = qs.stringify({
      resource_id: '4366bf30-01eb-4fa0-9f2a-c74153ec2b79',
      limit: 5
    });
    request(url + '?' + query, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        data = JSON.parse(body);
        res.render('index', {
          data: data.result.records[0]
        });
      } else {
        res.send(error);
      }
    });
  }).get('/api/estacionamiento/:id', function(req, res) {
    var id_estacionamiento;
    id_estacionamiento = req.param('id');
    return request(url + '_sql?sql=SELECT%20*%20from%20"4366bf30-01eb-4fa0-9f2a-c74153ec2b79"%20WHERE%20_id=' + id_estacionamiento, function(error, response, body) {
      var api_cd, record;
      if (!error && response.statusCode === 200) {
        api_cd = JSON.parse(body);
        record = api_cd.result.records[0];
        estacionamientos.findOne({
          id_estacionamiento: record._id
        }).exec(function(err, info) {
          if (err) {
            handleError(err);
          }
          data = {
            id_estacionamiento: record._id,
            precio: info.precio,
            rating: info.rating,
            disponibilidad: info.disponibilidad,
            coory: record.YCOORD,
            coorx: record.XCOORD
          };
          res.send(data);
        });
      } else {
        res.send(error);
      }
    });
  }).get('/api/llenar/:id', function(req, res) {
    var id, nuevo;
    id = req.param('id');
    id = parseInt(id);
    if (id > 2128) {
      return res.send('terminado');
    } else {
      nuevo = new estacionamientos({
        id_estacionamiento: id,
        precio: Math.floor((Math.random() * 50) + 1),
        rating: Math.floor((Math.random() * 5) + 1),
        disponibilidad: '#e53935'
      });
      return nuevo.save(function(e) {
        id += 1;
        return res.redirect('/api/llenar/' + id);
      });
    }
  }).get('/api/cercanos', function(req, res) {
    return request(url + '_sql?sql=SELECT%20*%20from%20"4366bf30-01eb-4fa0-9f2a-c74153ec2b79"', function(error, response, body) {
      var api_cd, cercanos, check_distance, j, num;
      if (!error && response.statusCode === 200) {
        api_cd = JSON.parse(body);
        cercanos = [];
        check_distance = function(i) {
          var distance, record;
          record = api_cd.result.records[i];
          distance = gl.getDistance({
            latitude: 19.440567,
            longitude: -99.181590
          }, {
            latitude: parseFloat(record.YCOORD),
            longitude: parseFloat(record.XCOORD)
          });
          distance = parseInt(distance);
          if (distance < 500) {
            cercanos.push(record._id);
            return console.log(distance);
          }
        };
        for (num = j = 1; j <= 2127; num = ++j) {
          check_distance(num);
        }
        return res.send(cercanos);
      }
    });
  });
};
