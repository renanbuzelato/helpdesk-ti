import { useState } from 'react';
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import FormChamado from './components/FormChamado';
import ListaChamados from './components/ListaChamados';
import { useFetch } from './hooks/useFetch';

function App() {
  const [paginaAtiva, setPaginaAtiva] = useState('lista');
  const {
    data: chamados,
    setData: setChamados,
    loading,
  } = useFetch('http://localhost:3000/chamados');

  function handleChamadoCriado(novoChamado) {
    setChamados((prev) => [...prev, novoChamado]);
    setPaginaAtiva('lista');
  }

  return (
    <>
      <NavBar paginaAtiva={paginaAtiva} onMudarPagina={setPaginaAtiva} />

      <Container>
        {paginaAtiva === 'form' && (
          <FormChamado onChamadoCriado={handleChamadoCriado} />
        )}

        {paginaAtiva === 'lista' && (
          <ListaChamados chamados={chamados} loading={loading} />
        )}
      </Container>
    </>
  );
}

export default App;