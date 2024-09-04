const GerenciadorDeTarefas = require("../src/Trabalho01Turma01");

describe('Testes da classe Trabalho01Turma01', () => {
    let gerenciador;

    beforeEach(() => {
        gerenciador = new GerenciadorDeTarefas();
    });

    test('Deve adicionar tarefa com descrição menor que 3 caracteres', () => {
        expect(() => {
            gerenciador.adicionarTarefa({ descricao: 'A' });
        }).toThrow('Erro ao cadastrar tarefa');
    });

    test('Deve adicionar tarefa com sucesso', () => {
        gerenciador.adicionarTarefa({ descricao: 'ABCD', id: 1 });

        expect(gerenciador.listarTarefas()).toContainEqual({ descricao: 'ABCD', id: 1 });
    });

    test('Deve remover tarefa com sucesso', () => {
        gerenciador.adicionarTarefa({ descricao: 'ABCD', id: 1 });

        gerenciador.removerTarefa(1);

        expect(gerenciador.listarTarefas()).toEqual([]);
    });

    test('Deve buscar tarefa por id com sucesso', () => {
        gerenciador.adicionarTarefa({ descricao: 'ABCD', id: 1 });

        expect(gerenciador.buscarTarefaPorId(1)).toEqual({ descricao: 'ABCD', id: 1 });
        expect(gerenciador.buscarTarefaPorId(2)).toBeUndefined();
    });

    test('Deve atualizar tarefa com sucesso', () => {
        gerenciador.adicionarTarefa({ descricao: 'ABCD', id: 1 });
        gerenciador.atualizarTarefa(1, { descricao: 'EFGH', id: 1 });

        expect(gerenciador.listarTarefas()).toContainEqual({ descricao: 'EFGH', id: 1 });
    });

    test('Deve atualizar tarefa com id inexistente', () => {
        gerenciador.adicionarTarefa({ descricao: 'ABCD', id: 1 });
        gerenciador.atualizarTarefa(2, { descricao: 'EFGH', id: 1 });
        expect(gerenciador.listarTarefas()).toContainEqual({ descricao: 'ABCD', id: 1 });
    });

    test('Deve listar tarefas com sucesso', () => {
        gerenciador.adicionarTarefa({ descricao: 'ABCD', id: 1 });
        gerenciador.adicionarTarefa({ descricao: 'EFGH', id: 2 });

        expect(gerenciador.listarTarefas()).toContainEqual({ descricao: 'ABCD', id: 1 });
        expect(gerenciador.listarTarefas()).toContainEqual({ descricao: 'EFGH', id: 2 });
        expect(gerenciador.listarTarefas()).toHaveLength(2);
    });

    test('Deve contar tarefas com sucesso', () => {
        gerenciador.adicionarTarefa({ descricao: 'ABCD', id: 1 });
        gerenciador.adicionarTarefa({ descricao: 'EFGH', id: 2 });

        expect(gerenciador.contarTarefas()).toStrictEqual(2);
    });

    test('Deve marcar tarefa como concluida com sucesso', () => {
        gerenciador.adicionarTarefa({ descricao: 'ABCD', id: 1 });

        gerenciador.marcarTarefaComoConcluida(1);

        expect(gerenciador.listarTarefasConcluidas()).toHaveLength(1);
    });

    test('Deve tentar marcar tarefa inexistente como concluida', () => {
        gerenciador.adicionarTarefa({ descricao: 'ABCD', id: 1, concluida: false });

        gerenciador.marcarTarefaComoConcluida(2);

        expect(gerenciador.listarTarefasConcluidas()).toHaveLength(0); 
    });

    test('Deve listar tarefas pendentes com sucesso', () => {
        gerenciador.adicionarTarefa({ descricao: 'ABCD', id: 1, concluida: false });

        expect(gerenciador.listarTarefasPendentes()).toHaveLength(1);
    });

    test('Deve remover tarefas concluidas com sucesso', () => {
        gerenciador.adicionarTarefa({ descricao: 'ABCD', id: 1, concluida: true });
        gerenciador.adicionarTarefa({ descricao: 'EFGH', id: 2, concluida: false });

        gerenciador.removerTarefasConcluidas();

        expect(gerenciador.listarTarefas()).toHaveLength(1);
    });

    test('Deve buscar tarefa por descricao com sucesso', () => {
        gerenciador.adicionarTarefa({ descricao: 'ABCD', id: 1 });

        expect(gerenciador.buscarTarefaPorDescricao('ABCD')).toHaveLength(1);
        expect(gerenciador.buscarTarefaPorDescricao('KDSK')).toHaveLength(0);
    });

    test('Deve adicionar tag a tarefa com sucesso', () => {
        gerenciador.adicionarTarefa({ descricao: 'ABCD', id: 1, tags: ['tag1'] });

        gerenciador.adicionarTagATarefa(1, 'tag2');

        expect(gerenciador.listarTarefas()).toContainEqual({ descricao: 'ABCD', id: 1, tags: ['tag1', 'tag2'] });
    });

    test('Deve tentar adicionar tag a tarefa inexistente', () => {
        gerenciador.adicionarTarefa({ descricao: 'ABCD', id: 1, tags: ['tag1'] });

        gerenciador.adicionarTagATarefa(2, 'tag2');

        expect(gerenciador.listarTarefas()).toContainEqual({ descricao: 'ABCD', id: 1, tags: ['tag1'] });
    });

    test('Deve tentar adicionar uma tag "nula" a tarefa', () => {
        gerenciador.adicionarTarefa({ descricao: 'ABCD', id: 1, tags: ['tag1'] });

        gerenciador.adicionarTagATarefa(1);

        expect(gerenciador.listarTarefas()).toContainEqual({ descricao: 'ABCD', id: 1, tags: ['tag1'] });
    });

    test('Deve adicionar tag a uma tarefa sem tags', () => {
        gerenciador.adicionarTarefa({ descricao: 'ABCD', id: 1 });

        gerenciador.adicionarTagATarefa(1, 'tag1');

        expect(gerenciador.listarTarefas()).toContainEqual({ descricao: 'ABCD', id: 1, tags: ['tag1'] });
    });

    test('Deve remover tag da tarefa com sucesso', () => {
        gerenciador.adicionarTarefa({ descricao: 'ABCD', id: 1, tags: ['tag1', 'tag2'] });

        gerenciador.removerTagDaTarefa(1, 'tag1');

        expect(gerenciador.listarTarefas()).toContainEqual({ descricao: 'ABCD', id: 1, tags: ['tag2'] });
    });

    test('Deve tentar remover tag da tarefa inexistente', () => {
        gerenciador.adicionarTarefa({ descricao: 'ABCD', id: 1, tags: ['tag1'] });

        gerenciador.removerTagDaTarefa(2, 'tag2');

        expect(gerenciador.listarTarefas()).toContainEqual({ descricao: 'ABCD', id: 1, tags: ['tag1'] });
    });

    test('Deve listar tarefas por tag com sucesso', () => {
        gerenciador.adicionarTarefa({ descricao: 'ABCD', id: 1, tags: ['tag1', 'tag2'] });
        gerenciador.adicionarTarefa({ descricao: 'EFGH', id: 2, tags: ['tag1'] });

        expect(gerenciador.listarTarefasPorTag('tag1')).toContainEqual({ descricao: 'ABCD', id: 1, tags: ['tag1', 'tag2'] });
        expect(gerenciador.listarTarefasPorTag('tag2')).toContainEqual({ descricao: 'ABCD', id: 1, tags: ['tag1', 'tag2'] });
        expect(gerenciador.listarTarefasPorTag('tag3')).toHaveLength(0);
    });

    test('Deve buscar tarefas por data com sucesso', () => {
        gerenciador.adicionarTarefa({ descricao: 'ABCD', id: 1, data: '2022-01-01' });
        gerenciador.adicionarTarefa({ descricao: 'EFGH', id: 2, data: '2022-01-02' });

        expect(gerenciador.buscarTarefasPorData('2022-01-01')).toContainEqual({ descricao: 'ABCD', id: 1, data: '2022-01-01' });
        expect(gerenciador.buscarTarefasPorData('2022-01-02')).toContainEqual({ descricao: 'EFGH', id: 2, data: '2022-01-02' });
        expect(gerenciador.buscarTarefasPorData('2022-01-03')).toHaveLength(0);
    });

    test('Deve atualizar prioridade com sucesso', () => {
        gerenciador.adicionarTarefa({ descricao: 'ABCD', id: 1, prioridade: 1 });
        gerenciador.atualizarPrioridade(1, 2);

        expect(gerenciador.listarTarefas()).toContainEqual({ descricao: 'ABCD', id: 1, prioridade: 2 });
    });

    test('Deve tentar atualizar prioridade de tarefa inexistente', () => {
        gerenciador.adicionarTarefa({ descricao: 'ABCD', id: 1, prioridade: 1 });

        gerenciador.atualizarPrioridade(2, 2);

        expect(gerenciador.listarTarefas()).toContainEqual({ descricao: 'ABCD', id: 1, prioridade: 1 });
    });

    test('Deve listar tarefas por prioridade com sucesso', () => {
        gerenciador.adicionarTarefa({ descricao: 'ABCD', id: 1, prioridade: 1 });
        gerenciador.adicionarTarefa({ descricao: 'EFGH', id: 2, prioridade: 2 });

        expect(gerenciador.listarTarefasPorPrioridade(1)).toContainEqual({ descricao: 'ABCD', id: 1, prioridade: 1 });
        expect(gerenciador.listarTarefasPorPrioridade(2)).toContainEqual({ descricao: 'EFGH', id: 2, prioridade: 2 });
        expect(gerenciador.listarTarefasPorPrioridade(3)).toHaveLength(0);
    });

    test('Deve contar tarefas por prioridade com sucesso', () => {
        gerenciador.adicionarTarefa({ descricao: 'ABCD', id: 1, prioridade: 1 });
        gerenciador.adicionarTarefa({ descricao: 'EFGH', id: 2, prioridade: 2 });

        expect(gerenciador.contarTarefasPorPrioridade(1)).toBe(1);
        expect(gerenciador.contarTarefasPorPrioridade(2)).toBe(1);
        expect(gerenciador.contarTarefasPorPrioridade(3)).toBe(0);
    });

    test('Deve marcar todas tarefas como concluidas com sucesso', () => {
        gerenciador.adicionarTarefa({ descricao: 'ABCD', id: 1, concluida: false });
        gerenciador.adicionarTarefa({ descricao: 'EFGH', id: 2, concluida: true });

        gerenciador.marcarTodasComoConcluidas();

        expect(gerenciador.listarTarefas()).toHaveLength(2);
    });

    test('Deve reabrir tarefa com sucesso', () => {
        gerenciador.adicionarTarefa({ descricao: 'ABCD', id: 1, prioridade: 1, concluida: true });

        gerenciador.reabrirTarefa(1);

        expect(gerenciador.listarTarefasConcluidas()).toHaveLength(0);
    });

    test('Deve tentar reabrir tarefa inexistente', () => {
        gerenciador.adicionarTarefa({ descricao: 'ABCD', id: 1, prioridade: 1, concluida: false });

        gerenciador.reabrirTarefa(2);

        expect(gerenciador.listarTarefasConcluidas()).toHaveLength(0);
    });

    test('Deve ordenar tarefas por data com sucesso', () => {
        gerenciador.adicionarTarefa({ descricao: 'ABCD', id: 1, data: '2022-01-01' });
        gerenciador.adicionarTarefa({ descricao: 'EFGH', id: 2, data: '2022-01-02' });

        gerenciador.ordenarTarefasPorData();

        expect(gerenciador.listarTarefas()).toContainEqual({ descricao: 'EFGH', id: 2, data: '2022-01-02' });
        expect(gerenciador.listarTarefas()).toContainEqual({ descricao: 'ABCD', id: 1, data: '2022-01-01' });
    });

    test('Deve ordenar tarefas por prioridade com sucesso', () => {
        gerenciador.adicionarTarefa({ descricao: 'ABCD', id: 1, prioridade: 1 });
        gerenciador.adicionarTarefa({ descricao: 'EFGH', id: 2, prioridade: 2 });

        gerenciador.ordenarTarefasPorPrioridade();

        expect(gerenciador.listarTarefas()).toContainEqual({ descricao: 'EFGH', id: 2, prioridade: 2 });
        expect(gerenciador.listarTarefas()).toContainEqual({ descricao: 'ABCD', id: 1, prioridade: 1 });
    });
});