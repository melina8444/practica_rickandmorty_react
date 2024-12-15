import React from "react";
import { Box, Badge, Text, Image} from "@chakra-ui/react";

const Character = ({ character }) => {
    
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "alive":
        return "green";
      case "dead":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <Box border="1px solid gray" borderRadius="md" p={4} mb={2}>
      <Text fontWeight="bold">{character.name}</Text>
      <Badge bg={getStatusColor(character.status)} color="white" p={1}>
        {character.status}
      </Badge>
      <Image
        src={character.image}
        alt={character.name}
        borderRadius="md"
        boxSize="150px"
        objectFit="cover"
        mr={{ base: 0, md: 4 }}
        mb={{ base: 4, md: 0 }}
      />
    </Box>
  );
};

export default Character;
