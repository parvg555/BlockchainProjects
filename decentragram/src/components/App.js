import React, {useEffect,useState} from 'react';
import './css/App.css';
import Navbar from './Navbar';

import Decentragram from '../abis/Decentragram.json'
import Posts from './Posts';
import Posting from './Posting';

import Web3 from 'web3';

function App() {

	const [account,setAccount] = useState()
	const [posts,setPosts] = useState([])
	const [decentragram, setDecentragram] = useState(null)
	const [postCount, setPostCount] = useState(undefined)
	const [posting,setPosting] = useState(false);

	const fetchContract =  async (web3) => {
		const networkId = await web3.eth.net.getId()
		const networkData = Decentragram.networks[networkId]
		if(networkData){
			const decentragram =new web3.eth.Contract(Decentragram.abi,networkData.address);
			setDecentragram(decentragram);
			const postCount = await decentragram.methods.postCount().call({
				from:networkData.address
			}).then((postCount) => {
				setPostCount(postCount);
				return postCount;
			})

			for(var i=1;i<=postCount;i++){
				await decentragram.methods.posts(i).call({
					from:networkData.address
				}).then((post) => {
					setPosts((posts) => [...posts,post]);
				})
			}
			
		}else{
			alert("Dapp not deployed to detected network");
		}
	}

	useEffect(() => {
		const ethEnable = async () => {
			if(window.ethereum){
				const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
				const accounts = await web3.eth.requestAccounts();
				setAccount(accounts[0]);
				await fetchContract(web3)
				return true;
			}
			return false;
		}
		if(!ethEnable()){
			alert("PLEASE INSTALL METAMASK!")
		}
	}, [])

	return (
    	<div className="App">
			{/* Navbar */}
      		<Navbar
				userid={account}  
				setPosting = {setPosting}
				posting = {posting}
			/>
			{/* POSTS */}
			{
				posting?
				(<Posting
					userid={account}
					decentragram = {decentragram}
				/>):
				(<Posts
					user = {account}
					posts = {posts}
					postCount={postCount}
					decentragram = {decentragram}
				/>)
			}
    	</div>
  	);
}

export default App;

