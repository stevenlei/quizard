import { ethers } from "ethers";
import QUIZARDNFT_ABI from "../../contracts/QuizardNFT.json";

export default async function handler(req, res) {
  const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_QUIZARD_JSON_API_PROVIDER_URL);
  const signer = new ethers.Wallet(process.env.NFT_DISTRIBUTOR_PRIVATE_KEY, provider);
  const contract = new ethers.Contract(process.env.NEXT_PUBLIC_QUIZARD_NFT_ADDRESS, QUIZARDNFT_ABI.abi, signer);

  const tx = await contract.mintQuizardNFTForStudent(req.body.quizard, req.body.student);
  const receipt = await tx.wait();
  const tokenId = receipt.events[0].args[2].toNumber();

  try {
    res.status(200).json({
      tokenId,
    });
  } catch (err) {
    res.status(500).json({});
  }
}
