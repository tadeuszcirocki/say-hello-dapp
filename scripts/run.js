const main = async() => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const factory = await hre.ethers.getContractFactory("SayHello");
    const contract = await factory.deploy({
        value: hre.ethers.utils.parseEther('1.0'),
    });
    await contract.deployed();
    console.log("Contract deployed to: (contract addr)", contract.address);
    console.log("Contract deployed by: (owner addr)", owner.address);

    //let ownerBalance = await hre.ethers.provider.getBalance(owner.address);
    //console.log('Owner balance:', hre.ethers.utils.formatEther(ownerBalance));
    let ownerBalance = await owner.getBalance();
    console.log('Owner balance: ', hre.ethers.utils.formatEther(ownerBalance));

    let contractBalance = await hre.ethers.provider.getBalance(contract.address);
    console.log('Contract balance:', hre.ethers.utils.formatEther(contractBalance));
    
    let waveTxn = await contract.wave("sup bro");
    await waveTxn.wait();
    let waveTxn2 = await contract.wave("youre awesome");
    await waveTxn2.wait();

    contractBalance = await hre.ethers.provider.getBalance(contract.address);
    console.log('Contract balance:', hre.ethers.utils.formatEther(contractBalance));

    //waveCount = await contract.getTotalWaves();
    //console.log("total waves: %s", waveCount);

    //let allWaves = await contract.getAllWaves();
    //console.log(allWaves);
}

const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();