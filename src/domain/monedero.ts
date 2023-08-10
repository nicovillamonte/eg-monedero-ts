import { BusinessError } from 'src/error/bussiness.error';
import { Decimal } from 'decimal.js'; // Se debe instalar la librería con `npm install decimal.js`, no existe implementacion nativa de BigDecimal

export class Monedero {
  constructor(private monto: Decimal = new Decimal(100)) {}

  poner(cuanto: Decimal): void {
    this.validarMonto(cuanto);
    this.sumarMonto(cuanto);
  }

  sacar(cuanto: Decimal): void {
    this.validarMonto(cuanto);
    if (this.monto.lessThan(cuanto)) {
      throw new BusinessError(`No puede sacar más de $ ${this.monto} $`);
    }
    this.sumarMonto(cuanto.negated());
  }

  private sumarMonto(valor: Decimal): void {
    this.monto = this.monto.add(valor);
  }

  private validarMonto(cuanto: Decimal): void {
    if (cuanto.toNumber() <= 0) {
      throw new BusinessError(
        `${cuanto}: el monto a ingresar debe ser un valor positivo`,
      );
    }
  }

  toString(): string {
    return `Monedero ($ ${this.monto})`;
  }
}
