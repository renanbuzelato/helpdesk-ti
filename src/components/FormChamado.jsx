import { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';

function FormChamado({ onChamadoCriado }) {
  const [solicitante, setSolicitante] = useState('');
  const [setor, setSetor] = useState('');
  const [tipo, setTipo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');

    if (solicitante.trim().length < 3) {
      setErro('O nome do solicitante deve ter no mínimo 3 caracteres.');
      return;
    }

    if (!setor || !tipo || !prioridade) {
      setErro('Por favor, preencha todas as opções de seleção.');
      return;
    }

    if (descricao.trim().length < 10) {
      setErro('A descrição do problema deve ter no mínimo 10 caracteres.');
      return;
    }

    const novoChamado = {
      solicitante: solicitante.trim(),
      setor,
      tipo,
      descricao: descricao.trim(),
      prioridade,
    };

    setEnviando(true);

    try {
      const res = await fetch('http://localhost:3000/chamados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoChamado),
      });

      const chamadoSalvo = await res.json();

      // Limpa todos os campos do formulário
      setSolicitante('');
      setSetor('');
      setTipo('');
      setDescricao('');
      setPrioridade('');

      // Atualiza o state no App e redireciona para a lista
      onChamadoCriado(chamadoSalvo);
    } catch (error) {
      console.error('Erro ao registrar chamado:', error);
      setErro('Erro ao conectar com o servidor. Verifique se o JSON Server está rodando.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="mb-4">Abrir Novo Chamado Técnico</Card.Title>

        {erro && <Alert variant="danger">{erro}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formSolicitante">
            <Form.Label>Nome do Solicitante</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite seu nome completo"
              value={solicitante}
              onChange={(e) => setSolicitante(e.target.value)}
              minLength={3}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSetor">
            <Form.Label>Setor</Form.Label>
            <Form.Select
              value={setor}
              onChange={(e) => setSetor(e.target.value)}
              required
            >
              <option value="">Selecione o setor...</option>
              <option value="TI">TI</option>
              <option value="RH">RH</option>
              <option value="Financeiro">Financeiro</option>
              <option value="Operações">Operações</option>
              <option value="Comercial">Comercial</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTipo">
            <Form.Label>Tipo de Problema</Form.Label>
            <Form.Select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
            >
              <option value="">Selecione o tipo de problema...</option>
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
              <option value="Rede">Rede</option>
              <option value="Acesso">Acesso</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescricao">
            <Form.Label>Descrição do Problema</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Descreva detalhadamente o problema ocorrido (mínimo 10 caracteres)"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              minLength={10}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formPrioridade">
            <Form.Label>Prioridade</Form.Label>
            <Form.Select
              value={prioridade}
              onChange={(e) => setPrioridade(e.target.value)}
              required
            >
              <option value="">Selecione a prioridade...</option>
              <option value="Baixa">Baixa</option>
              <option value="Média">Média</option>
              <option value="Alta">Alta</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit" disabled={enviando}>
            {enviando ? 'Enviando...' : 'Registrar Chamado'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default FormChamado;