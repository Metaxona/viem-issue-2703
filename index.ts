import {
    createWalletClient,
    createPublicClient,
    http,
    erc20Abi,
    parseEther,
  } from 'viem';
  import { sepolia } from 'viem/chains';
  import { privateKeyToAccount } from 'viem/accounts';
  
  const account = privateKeyToAccount('0x<Private Key Here>');
  
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(),
  });
  
  const walletClient = createWalletClient({
    chain: sepolia,
    transport: http(),
    account: account,
  });
  
  async function main() {
    try {
      const balance = await publicClient.getBalance({ address: account.address });
  
      console.log('BALANCE: ', balance);
  
      const { result, request } = await publicClient.simulateContract({
        address: '0x5acf514746f8A725A5D688359dFF1F5db289D7d0',
        abi: erc20Abi,
        functionName: 'approve',
        args: ['0x5Ff40197C83C3A2705ba912333Cf1a37BA249eB7', parseEther('1')],
        account: account.address,
      });
  
    //   const hash = await walletClient.writeContract(request);
  
    //   console.log('HASH', hash);
  
      return { 
        result, 
        // request, 
        // hash
     };
    } catch (err) {
      throw err;
    }
  }
  
  main()
    .then((res) => console.log('RESULT: ', res))
    .catch(console.error);
  