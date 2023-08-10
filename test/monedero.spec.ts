import Decimal from 'decimal.js';
import { Monedero } from 'src/domain/monedero';
import { BusinessError } from 'src/error/bussiness.error';

describe('Dado un monedero', () => {
  let monedero: Monedero;

  beforeEach(() => {
    monedero = new Monedero(new Decimal(100));
  });

  it('al poner plata sube el monedero', () => {
    monedero.poner(new Decimal(25));
    expect(monedero.toString()).toEqual('Monedero ($ 125)');
  });

  it('no se puede poner un monto negativo', () => {
    expect(() => monedero.poner(new Decimal(-1))).toThrow(BusinessError);
  });

  it('no se puede poner cero pesos', () => {
    expect(() => monedero.poner(new Decimal(0))).toThrow(BusinessError);
  });

  it('al sacar plata baja el monedero', () => {
    monedero.sacar(new Decimal(100));
    expect(monedero.toString()).toEqual('Monedero ($ 0)');
  });

  it('no se puede sacar un monto negativo', () => {
    expect(() => monedero.sacar(new Decimal(-1))).toThrow(BusinessError);
  });

  it('no se puede sacar cero pesos', () => {
    expect(() => monedero.sacar(new Decimal(0))).toThrow(BusinessError);
  });

  it('no se puede sacar más plata de la que hay', () => {
    expect(() => monedero.sacar(new Decimal(101))).toThrow(BusinessError);
  });

  it('muestra el saldo en la representación del string', () => {
    expect(monedero.toString()).toEqual('Monedero ($ 100)');
  });
});
