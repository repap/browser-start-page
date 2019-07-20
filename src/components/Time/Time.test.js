import Time from './Time'
import { exportAllDeclaration } from '@babel/types';

test('number 1 shall be transformed to 01', () => {
  expect(Time.twoDigitNumber(1)).toBe('01')
})