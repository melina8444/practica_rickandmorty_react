import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Select,
  Spinner,
  Text,
  Button,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import Character from "./Character";
import axios from "axios";

const List = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // cambiar el tamaño del input según el tamaño de la pantalla
  const inputSize = useBreakpointValue({ base: "sm", md: "md" });

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character/?page=${page}`
        );
        setCharacters(response.data.results);
        setTotalPages(response.data.info.pages);
        setFilteredCharacters(response.data.results);
      } catch (err) {
        setError("Error al cargar los personajes. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };
    fetchCharacters();
  }, [page]);

  useEffect(() => {
    let filtered = characters;

    if (search) {
      filtered = filtered.filter((char) =>
        char.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status) {
      filtered = filtered.filter((char) => char.status === status);
    }

    if (gender) {
      filtered = filtered.filter((char) => char.gender === gender);
    }

    setFilteredCharacters(filtered);
  }, [search, status, gender, characters]);

  // Resetear filtros
  const resetFilters = () => {
    setSearch("");
    setStatus("");
    setGender("");
  };

  return (
    <Box maxW="1200px" mx="auto" p={4}>
      {/* Filtros */}
      <Box mb={6}>
        <Stack direction={{ base: "column", md: "row" }} spacing={4}>
          <Input
            placeholder="Buscar personaje"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size={inputSize}
          />
          <Select
            placeholder="Estado"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            size={inputSize}
          >
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">Unknown</option>
          </Select>
          <Select
            placeholder="Género"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            size={inputSize}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </Select>
          <Button colorScheme="teal" onClick={resetFilters} size={inputSize}>
            Restablecer Filtros
          </Button>
        </Stack>
      </Box>

      {/* Indicador de carga */}
      {loading && (
        <Box textAlign="center" my={4}>
          <Spinner size="xl" />
        </Box>
      )}

      {/* Manejo de errores */}
      {error && (
        <Text color="red.500" textAlign="center" my={4}>
          {error}
        </Text>
      )}

      {/* Lista de personajes */}
      {!loading && !error && filteredCharacters.length === 0 && (
        <Text textAlign="center" my={4}>
          No se encontraron personajes.
        </Text>
      )}

      {!loading &&
        !error &&
        filteredCharacters.map((char) => (
          <Character key={char.id} character={char} />
        ))}

      {/* Paginación */}
      {!loading && !error && totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={6}>
          <Button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            colorScheme="teal"
            mr={2}
            size="lg"
          >
            {"<"}
          </Button>
          <Text
            fontWeight="bold"
            fontSize="lg"
            alignSelf="center"
          >{`Página ${page} de ${totalPages}`}</Text>
          <Button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            colorScheme="teal"
            ml={2}
            size="lg"
          >
            {">"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default List;
