const main = async () => {
    //const [owner] = await hre.ethers.getSigners();
    //const accountBalance = await deployer.getBalance();
    //console.log('Deploying contracts with account: ', owner.address);
    //console.log('Account balance: ', accountBalance.toString());
  
    const contractFactory = await hre.ethers.getContractFactory('SayHello');
    const contract = await contractFactory.deploy({
        value: hre.ethers.utils.parseEther('1.0'),
    });
    await contract.deployed();
  
    console.log('WavePortal address: ', contract.address);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  runMain();