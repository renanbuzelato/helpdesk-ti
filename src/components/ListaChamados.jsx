import { Table, Badge, Spinner, Alert, Card } from 'react-bootstrap';

function ListaChamados({ chamados, loading }) {
  function getBadgeVariant(prioridade) {
    if (prioridade === 'Alta') return 'danger';
    if (prioridade === 'Média') return 'warning';
    return 'success';
  }

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status" className="me-2" />
        <span>Carregando chamados...</span>
      </div>
    );
  }

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="mb-4">Chamados Abertos</Card.Title>

        {chamados.length === 0 ? (
          <Alert variant="info">Nenhum chamado registrado no momento.</Alert>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Solicitante</th>
                <th>Setor</th>
                <th>Tipo</th>
                <th>Descrição</th>
                <th>Prioridade</th>
              </tr>
            </thead>
            <tbody>
              {chamados.map((chamado) => (
                <tr key={chamado.id}>
                  <td>{chamado.id}</td>
                  <td>{chamado.solicitante}</td>
                  <td>{chamado.setor}</td>
                  <td>{chamado.tipo}</td>
                  <td>{chamado.descricao}</td>
                  <td>
                    <Badge bg={getBadgeVariant(chamado.prioridade)}>
                      {chamado.prioridade}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
}

export default ListaChamados;