const { Writable } = require('stream')
const { BasicEnv, NestedEnv } = require('./environment')

class Evaluator extends Writable {
  constructor(options) {
    super(Object.assign({}, options, {
      objectMode: true,
    }))

    this.env = new NestedEnv()
  }
  _write(chunk, encoding, callback) {
    this.astList = chunk
    callback()
  }
  _final(callback) {
    let r
    this.astList.map((ast) => {
      r = ast.eval(this.env)
      console.log(`result: ${r}`)
    })
  
    callback()
  }
}

module.exports = Evaluator
