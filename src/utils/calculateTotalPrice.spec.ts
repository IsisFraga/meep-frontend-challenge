/// <reference types="jest" />

import calculateTotalPrice from './calculateTotalPrice';
import { cartItems, products } from './calculateTotalPrice.mock'

describe('calculateTotalPrice', () => {
  it('should returns the correct total price', () => {
    const totalPrice = calculateTotalPrice({ products, cartItems });
    expect(totalPrice).toEqual(15.99 * 7 + 1 * 109.95 + 1 * 64 + 1 * 10.99);
  });
});
