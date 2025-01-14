import { Assert } from '../../assert'
import { Value } from '@sinclair/typebox/value'
import { Type } from '@sinclair/typebox'

describe('value/transform/String', () => {
  // --------------------------------------------------------
  // Identity
  // --------------------------------------------------------
  const T0 = Type.Transform(Type.Symbol())
    .Decode((value) => value)
    .Encode((value) => value)
  it('Should decode identity', () => {
    const R = Value.Decode(T0, Symbol('hello'))
    Assert.IsEqual(R.description, 'hello')
  })
  it('Should encode identity', () => {
    const R = Value.Encode(T0, Symbol('hello'))
    Assert.IsEqual(R.description, 'hello')
  })
  it('Should throw on identity decode', () => {
    Assert.Throws(() => Value.Decode(T0, null))
  })
  // --------------------------------------------------------
  // Mapped
  // --------------------------------------------------------
  const T1 = Type.Transform(Type.Symbol())
    .Decode((value) => Symbol(value.description?.split('').reverse().join('')))
    .Encode((value) => Symbol(value.description?.split('').reverse().join('')))
  it('Should decode mapped', () => {
    const R = Value.Decode(T1, Symbol('ABC'))
    Assert.IsEqual(R.description, 'CBA')
  })
  it('Should encode mapped', () => {
    const R = Value.Encode(T1, Symbol('CBA'))
    Assert.IsEqual(R.description, 'ABC')
  })
  it('Should throw on mapped decode', () => {
    Assert.Throws(() => Value.Decode(T1, null))
  })
})
