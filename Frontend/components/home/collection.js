import {
  Table,
  Thead,
  Tbody,
  //   Tfoot,
  Tr,
  Th,
  Td,
  //   TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const TableHeader = [
  "Collection",
  " NFT in Collection",
  "Floor price(MATIC)",
  "Active collection",
  "Available to borrow",
];

const bodyData = [
  {
    name: "Azuki",
    quantity: 10,
    floorPrice: 3,
    activeCollection: 7,
    availableCollection: 3,
  },

  {
    name: "BAYC",
    quantity: 20,
    floorPrice: 7,
    activeCollection: 10,
    availableCollection: 10,
  },

  {
    name: "CloneX ",
    quantity: 15,
    floorPrice: 2,
    activeCollection: 7,
    availableCollection: 8,
  },

  {
    name: "CoolCats",
    quantity: 10,
    floorPrice: 3,
    activeCollection: 7,
    availableCollection: 3,
  },
  {
    name: "CryptoPunks ",
    quantity: 25,
    floorPrice: 10,
    activeCollection: 10,
    availableCollection: 15,
  },

  {
    name: "Cryptoadz ",
    quantity: 12,
    floorPrice: 4,
    activeCollection: 7,
    availableCollection: 5,
  },

  {
    name: "Doodles",
    quantity: 10,
    floorPrice: 3,
    activeCollection: 7,
    availableCollection: 3,
  },
  {
    name: "MAYC",
    quantity: 10,
    floorPrice: 3,
    activeCollection: 7,
    availableCollection: 3,
  },
  {
    name: "VeeFriends ",
    quantity: 12,
    floorPrice: 1,
    activeCollection: 7,
    availableCollection: 3,
  },
  {
    name: "World of Women ",
    quantity: 12,
    floorPrice: 1,
    activeCollection: 7,
    availableCollection: 3,
  },
];

const CollectionSection = () => {
  return (
    <>
      <h2 className="text-center font-bold text-3xl text-white mb-3">
        Collections
      </h2>

      <TableContainer>
        <Table variant="simple" size="sm">
          {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
          <Thead>
            <Tr>
              {TableHeader.map((item, i) => (
                <Th key={i}>{item}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {bodyData.map((item, i) => (
              <Tr key={i}>
                <Td>{item.name}</Td>
                <Td>{item.quantity}</Td>
                <Td>{item.floorPrice}</Td>
                <Td>{item.activeCollection}</Td>
                <Td>{item.availableCollection}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CollectionSection;
