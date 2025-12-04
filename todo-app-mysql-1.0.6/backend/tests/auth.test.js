const request = require('supertest');
const { Sequelize } = require('sequelize');
const { initModels } = require('../models');
const bcrypt = require('bcrypt');
let app; // Express app
