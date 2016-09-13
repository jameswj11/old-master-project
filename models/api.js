'use strict'
const router   = require('express').Router()
const jsonData = require('../old-masters.json')

module.exports = {
  searchArt: function(req, res, next){
    if('artist' in req.query){
      res.art = jsonData.artists.filter(function(artist){
        return artist.name
                     .toLowerCase()
                     .includes(req.query.artist.toLowerCase())
      })

    } else {
      res.art = jsonData;
    }
    next()
  }
}
