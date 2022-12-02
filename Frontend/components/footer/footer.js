const Footer = () => {
  return (
    <div className="bg-navyBlue py-8 text-white">
      <div className="max-w-[1300px] mx-auto px-5 md:px-10 flex flex-col md:flex-row gap-10">
        <div className="max-w-[350px]">
          <h3 className="text-2xl font-bold mb-3">LENDA</h3>
          <p>
            The world’s first and largest digital marketplace for crypto
            collectibles and non-fungible tokens (NFTs). Buy, sell, and discover
            exclusive digital items.
          </p>
        </div>

        <div>
          <p className="font-[600] mb-3">Resources</p>
          <ul className="flex flex-col">
            <li>Learn</li>
            <li>Blog</li>
            <li>Help</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div>
          <p className="font-[600] mb-3">Products</p>
          <ul className="flex flex-col">
            <li>Lend protocol</li>
            <li>Marketplace</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
