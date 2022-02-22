import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import { TestProvider } from "./context";
import { Produto, Venda, EditarProduto } from "./screens";

const PathComponent = {
  "/venda": <Venda />,
  "/venda/produto": <Produto />,
  "/venda/editar-produto": <EditarProduto />
}

const componentProvider = (props) => {
  const {
    location: { pathname },
  } = props;

  return (
    <TestProvider>
      {PathComponent[pathname]}
    </TestProvider>
  )
}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <h1>/home</h1>
          <Link to="/venda">/venda</Link>
        </Route>
        <Route
          exact
          // quando precisar colocar um contexto englobando mais de uma rota
          // pode ser feito dessa forma:
          path={Object.keys(PathComponent).map(item => item)}
          // quando ocorre a navegação para algum desses paths, o contexto é montado
          // desta forma o mesmo contexto pode ser reutilizado para várias rotas
          render={(props) => componentProvider(props)}
        ></Route>
        <Route>
          <h1>404</h1>
          <Link to="/">/home</Link>
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
