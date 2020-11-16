'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StarlinkSchema extends Schema {
  up () {
    this.create('starlinks', (table) => {
      table.increments()
      // test
      // table.string('name').notNullable()
      // table.string('color').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('starlinks')
  }
}

module.exports = StarlinkSchema
