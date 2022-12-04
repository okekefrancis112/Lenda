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
  "NFT in Collection",
  "Floor price(MATIC)",
  // "Active collection",
  "Available to borrow",
];

const bodyData = [
  {
    name: "Azuki",
    quantity: 10,
    availableCollection: 3,
    // activeCollection: 7,
    floorPrice: 7169000000000000000000,
  },

  {
    name: "BAYC",
    quantity: 20,
    availableCollection: 7,
    // activeCollection: 10,
    floorPrice: 46224500000000000000000,
  },

  {
    name: "CloneX ",
    quantity: 15,
    availableCollection: 2,
    // activeCollection: 7,
    floorPrice: 4705500000000000000000,
  },

  {
    name: "CoolCats",
    quantity: 10,
    availableCollection: 3,
    // activeCollection: 7,
    floorPrice: 1413655000000000000000,
  },
  {
    name: "CryptoPunks ",
    quantity: 25,
    availableCollection: 10,
    // activeCollection: 10,
    floorPrice: 45133390000000000000000,
  },

  {
    name: "Cryptoadz ",
    quantity: 12,
    availableCollection: 4,
    // activeCollection: 7,
    floorPrice: 1005095000000000000000,
  },

  {
    name: "Doodles",
    quantity: 10,
    availableCollection: 3,
    // activeCollection: 7,
    floorPrice: 4852160000000000000000,
  },
  {
    name: "MAYC",
    quantity: 10,
    availableCollection: 3,
    // activeCollection: 7,
    floorPrice: 148089000000000000000000,
  },
  {
    name: "VeeFriends ",
    quantity: 12,
    availableCollection: 1,
    // activeCollection: 7,
    floorPrice: 3257755000000000000000,
  },
  {
    name: "World of Women ",
    quantity: 12,
    availableCollection: 1,
    // activeCollection: 7,
    floorPrice: 1315225000000000000000,
  },
];

const CollectionSection = () => {
  return (
    <>
      <h2 className="text-center font-bold text-3xl text-white mb-3">
        Collections
      </h2>

      <TableContainer>
        <Table variant="simple" size="md">
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
                <Td>{item.floorPrice / 1e18}</Td>
                {/* <Td>{item.activeCollection}</Td> */}
                <Td>{(item.floorPrice * 0.5) / 1e18}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CollectionSection;
