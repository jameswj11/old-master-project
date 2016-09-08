'use strict'
const router   = require('express').Router()
const request  = require('request')
const jsonData = require('../old-masters.json')

module.exports = {
  searchArt: function(req, res, next){
    console.log(req.query)
    if('artist' in req.query){
      function filterArtist(artist){
        return artist.name.toLowerCase().includes(req.query.artist);
      }
      res.art = jsonData.artists.filter(filterArtist)
    } else {
      res.art = jsonData;
    }
    next()
  }
}
