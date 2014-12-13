require 'bundler'
Bundler.require

require './app/controllers/application_controller'

map ('/'){run ApplicationController}