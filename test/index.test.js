import React from 'react'
import Enzyme from 'enzyme'
import { shallow, mount } from 'enzyme'
import { expect, assert } from 'chai'
import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai'
// import chaiEnzyme from 'chai-enzyme'
// chai.use(chaiEnzyme())
Enzyme.configure({ adapter: new Adapter() })

import fixtures from './fixtures'
import Menu from '../src/components/Menu/index'
import MenuItem from '../src/components/Menu/MenuItem'
import Orders from '../src/components/Orders'

describe('Menu', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Menu menu={fixtures.menu.data} />)
  })
  it('it works', done => {
    assert.ok(wrapper)
    done()
  })
})

describe('MenuItem', () => {
  let wrapper
  beforeEach(() => {
    const { items } = fixtures.menu.data
    const chicken = items.find(i => i.id === 4)
    wrapper = shallow(<MenuItem item={chicken} />)
  })
  it('it works', done => {
    assert.ok(wrapper)
    done()
  })
})

// describe('Orders', () => {
//   let wrapper
//   beforeEach(() => {
//     const { items } = fixtures.menu.data
//     const chicken = items.find(i => i.id === 4)
//     wrapper = shallow(<Orders item={chicken} />)
//   })
//   it('it works', done => {
//     assert.ok(wrapper)
//     done()
//   })
// })