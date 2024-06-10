import { expect, test } from "vitest";
import {sum} from '../sum';

test('Debe sumar 1 + 2 igual a 3', () => {
    expect(sum(1,2)).toBe(3);
})