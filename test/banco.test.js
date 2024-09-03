const Banco = require("../src/banco");

describe('Testes da classe Banco', () => {
    let conta;

    beforeEach(() => {
        conta = new Banco('Conta Ugioni', 20);
    });

    test('Deve depositar dinheiro corretamente', () => {
        conta.depositar(7.7);
        expect(conta.obterSaldo()).toBe(27.7);
    });

    test('Deve lançar exceção ao sacar valor maior que o saldo', () => {
        expect(() => {
            conta.sacar(30);
        }).toThrow('Saldo insuficiente');
    });

    test('Deve sacar dinheiro corretamente', () => {        
        conta.sacar(10.5);
        expect(conta.obterSaldo()).toBe(9.5);
    });

    test('Deve transferir dinheiro para outra conta corretamente', () => {
        const contaDestino = new Banco('Conta Destino');
        contaDestino.depositar(5);
        
        conta.depositar(10);
        conta.transferir(5, contaDestino);
        
        expect(conta.obterSaldo()).toBe(25);
        expect(contaDestino.obterSaldo()).toBe(10);
        expect(conta.obterHistorico()).toContainEqual({
            tipo: 'Transferência',
            valor: 5,
            destino: 'Conta Destino'
        });
    });

    test('Deve definir o limite de saque', () => {        
        conta.definirLimiteDeSaque(10);

        expect(conta.limiteDeSaque).toBe(10);
    });

    test('Deve lançar exceção quando o saque for maior que o limite', () => {        
        conta.definirLimiteDeSaque(10);

        expect(() => {
            conta.verificarLimiteDeSaque(20);
        }).toThrow('Saque acima do limite permitido');
    });

    test('Deve validar o valor de saque com sucesso', () => {        
        conta.definirLimiteDeSaque(10);

        expect(conta.verificarLimiteDeSaque(9)).toBe(true);
    });

    test('Deve aplicar juros com sucesso', () => {   
        expect(conta.aplicarJuros(10)).toBe(22);
    });

    test('Deve validar transação de juros com sucesso', () => {        
        conta.aplicarJuros(10);

        expect(conta.obterHistorico()).toContainEqual({
            tipo: 'Juros',
            valor: 2
        });
    });

    test('Deve pagar conta com sucesso', () => {   
        expect(conta.pagarConta(10)).toBe(10);
    });

    test('Deve validar transação de pagamento com sucesso', () => {        
        conta.pagarConta(10);

        expect(conta.obterHistorico()).toContainEqual({
            tipo: 'Pagamento',
            valor: 10
        });
    });

    test('Deve obter total depositado', () => {   
        conta.depositar(15);
        conta.depositar(45);

        expect(conta.obterTotalDepositado()).toBe(60);
    });
});