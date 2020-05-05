import React, {
  FunctionComponent,
  Reducer,
  useReducer,
  useEffect,
  FormEventHandler,
  ChangeEventHandler,
  MouseEventHandler,
} from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Spinner,
  Navbar,
  Form,
  FormControl,
  Pagination,
} from "react-bootstrap";
import { Giphy, Gif } from "../interfaces/giphy.interface";

type State = {
  gifs: Giphy["data"];
  loading: boolean;
  q: string;
  page: number;
  option: string;
};

const initialState: State = {
  gifs: [],
  loading: false,
  q: "",
  page: 0,
  option: "search",
};

type Action =
  | { type: "GET_TRENDING" }
  | { type: "SET_TRENDING"; payload: Giphy["data"] }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SEND_SEARCH" }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_OPTION"; payload: string };

const reducer: Reducer<State, Action> = (
  state: State,
  action: Action
): State => {
  switch (action.type) {
    case "SET_TRENDING":
      return { ...state, gifs: [...action.payload] };
    case "GET_TRENDING":
      return { ...state, page: 0 };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_OPTION":
      return { ...state, option: action.payload };
    case "SET_SEARCH":
      return { ...state, q: action.payload };
    default:
      throw new Error();
  }
};

export const Trending: FunctionComponent = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const gifs: JSX.Element[] = state.gifs.map((gif: Gif) => {
    console.log(state.gifs);
    return (
      <Col md={4} key={gif.id}>
        <h2 className="h6 my-3">{gif.title}</h2>

        <Image src={gif.images.original.webp} rounded fluid />
      </Col>
    );
  });

  const fetchTrending = async () => {
    try {
      dispatch({ type: "GET_TRENDING" });

      const result: Response = await fetch(
        "https://api.giphy.com/v1/gifs/trending?api_key=bEwsrCAqA59ckIljoJCyWmIYohMwCdos&limit=10"
      );

      const trendingGifs: Giphy = await result.json();

      dispatch({
        type: "SET_TRENDING",
        payload: trendingGifs.data,
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    console.log(state.gifs);

    if (!state.gifs.length) {
      fetchTrending();
    }
  }, [state.gifs]);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (state.option === "random") {
      fetchRandom();
    } else {
      search();
    }
  };

  const search = async () => {
    try {
      const request = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=bEwsrCAqA59ckIljoJCyWmIYohMwCdos&q=${state.q}&limit=10`
      );

      const giphy: Giphy = await request.json();

      console.log("Search", giphy);

      dispatch({ type: "SET_TRENDING", payload: giphy.data });
    } catch (error) {
      throw new Error(error);
    }
  };

  const pageChanged: MouseEventHandler<HTMLUListElement> = async (e) => {
    e.preventDefault();

    let page: number = 0;
    const target: HTMLUListElement = e.target as HTMLUListElement;

    if (target.textContent) {
      page = +target.textContent;

      dispatch({ type: "SET_PAGE", payload: page });
    }

    try {
      const response: Response = await fetch(
        `https://api.giphy.com/v1/gifs/trending?api_key=bEwsrCAqA59ckIljoJCyWmIYohMwCdos&q=${state.q}&limit=10&offset=${state.page}`
      );

      const giphy: Giphy = await response.json();

      console.log("Search", giphy);

      dispatch({ type: "SET_TRENDING", payload: giphy.data });
    } catch (error) {
      throw new Error(error);
    }
  };

  const fetchRandom = async () => {
    try {
      const response: Response = await fetch(
        `https://api.giphy.com/v1/gifs/random?api_key=bEwsrCAqA59ckIljoJCyWmIYohMwCdos&tag=${state.q}`
      );

      const gif: { data: Gif; meta: Giphy["meta"] } = await response.json();

      dispatch({ type: "SET_TRENDING", payload: [gif.data] });
    } catch (error) {
      throw new Error(error);
    }
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();

    dispatch({ type: "SET_SEARCH", payload: e.target.value });
  };

  const onSelectChange: ChangeEventHandler = (e) => {
    e.preventDefault();
    const option = (e.target as HTMLOptionElement).value;

    dispatch({ type: "SET_OPTION", payload: option });
    console.log(option);

    if (option === "random") {
      fetchRandom();
    } else {
      //   fetchSearch();
    }
  };

  return (
    <Container>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Giffr</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="ml-auto" inline onSubmit={onSubmit}>
            <FormControl
              onChange={onChange}
              name="q"
              type="text"
              placeholder={state.option === "search" ? "Tag" : "Query"}
              className="mr-sm-2"
            />
            <Form.Group controlId="formGridState">
              <Form.Control onChange={onSelectChange} as="select">
                <option value="search">Search</option>
                <option value="random">Random</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Navbar.Collapse>
      </Navbar>

      <Row>
        {state.loading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}

        {gifs}
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <Pagination onClick={pageChanged}>
            {state.gifs.map((_gif, i) => {
              return (
                <Pagination.Item active={i === state.page} key={i}>
                  {i}
                </Pagination.Item>
              );
            })}
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};
