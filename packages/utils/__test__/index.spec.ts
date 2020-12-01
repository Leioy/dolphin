import { sum } from '../index'

describe('测试utils', () => {
	test('sum', () => {
		expect(sum(1, 2)).toBe(3)
		expect(sum(2, 3)).toBe(5)
	})
})
