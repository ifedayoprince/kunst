import test from 'ava'

import { beginEtch } from './index'

test.before(async t => {
  console.log('Starting tests!')
})

test('can order a pizza', async t => {

  let result = await beginEtch({
    peppers: false,
    pineapple: false,
    bbqSauce: false,
    cheeseType: 'swiss'
  })

  t.true(result.message.includes('you ordered a pizza'))
  t.true(result.message.includes('swiss'))

})
